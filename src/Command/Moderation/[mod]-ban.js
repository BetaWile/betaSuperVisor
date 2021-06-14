const { MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.BanYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(1).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))

    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let banatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")

    let cezaID = db.get(`cezaid.${message.guild.id}`)+1
    db.add(`cezapuan.${uye.id}.${message.guild.id}`, +39);
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`);

    db.add(`cezaid.${message.guild.id}`, +1);
    db.push(`moderasyon.${uye.id}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: uye.id ,ID: cezaID,Komut: 'Sunucudan Yasaklandı',Puan: '+30', Tarih: banatılma, Sebep: sebep, Süre: 'BAN'})
    db.set(`moderasyon.${cezaID}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: uye.id ,ID: cezaID,Komut: 'Sunucudan Yasaklandı',Puan: '+30', Tarih: banatılma, Sebep: sebep, Süre: 'BAN'})

    const CezaLog = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setColor('RED')
    .setDescription(`
    ${uye} adlı kullanıcıı sunucudan yasaklandı. \n

    • Yetkili: ${message.author} (\`${message.author.id}\`)
    • Kullanıcı: ${uye} (\`${uye.id}\`)
    • Tarih: \`${banatılma}\`
    • Sebep: \`${sebep}\`
    `)
    message.channel.send(new MessageEmbed().setDescription(`${uye} (\`${uye.id}\`) adlı kullanıcı banlandı!`))
    client.channels.cache.get(config.Log.BanLog).send(CezaLog)
    client.channels.cache.get(config.Log.CezaPuanLog).send(`${uye}: aldığınız **#${cezaID}**  ID'li ceza ile **${cpuan}** ceza puanına ulaştınız.`)

    uye.ban({ reason: `${message.author.id} ID'li yetkili tarafından banlandı.`})
};

module.exports.config = { 
    name: 'ban',
    aliases: ['yasakla']
};