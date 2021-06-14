const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
    if(![config.Yetkili.AbilityYT,config.Yetkili.vmuteYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let zaman = args[1]
    if(!zaman) return message.channel.send(yanlis.setDescription(`Bir zaman belirtmen gerekiyor.`)).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(2).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))
    
    let timereplace = args[1];
    let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
    var tarih = new Date(Date.now())
    var tarih2 = ms(timereplace)
    var tarih3 = Date.now() + tarih2
    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let bitişay = moment(tarih3).format("MM")
    let bitişgün = moment(tarih3).format("DD")
    let bitişsaat = moment(tarih3).format("HH:mm:ss")
    let voiceatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    let voicebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
    moment.locale("tr");

    let cezaID = db.get(`cezaid.${message.guild.id}`)+1
    db.add(`cezapuan.${uye.id}.${message.guild.id}`, +8);
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`);
    db.add(`cezaid.${message.guild.id}`, +1);
    db.push(`moderasyon.${uye.id}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: uye.id ,ID: cezaID, Komut: 'Voice Mute',Puan: '+8', Tarih: voiceatılma, Sebep: sebep, Süre: time})
    db.set(`moderasyon.${cezaID}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: uye.id ,ID: cezaID, Komut: 'Voice Mute',Puan: '+8', Tarih: voiceatılma, Sebep: sebep, Süre: time})

    db.set(`vmuteli.${uye.id}.${message.guild.id}`, 'vmuteli')
    db.set(`süre.${uye.id}.${message.guild.id}`, zaman)

    let embed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setColor("RED")
    .setDescription(`${uye} (\`${uye.id}\`) kullanıcısı ses kanallarında susturuldu.
    • Yetkili: ${message.author} (\`${message.author.id}\`)
    • Kullanıcı: ${uye} (\`${uye.id}\`)
    • Süre: \`${zaman}\`
    • Mute Atılma: \`${voiceatılma}\`
    • Mute Bitiş: \`${voicebitiş}\`

    • Sebep: \`${sebep}\`
    `)
    await uye.roles.add(config.Roller.VMuted)
    await client.channels.cache.get(config.Log.VMuteLog).send(embed)
    await message.channel.send(yanlis.setDescription(`${uye} (\`${uye.id}\`) kullanıcısı ses mute cezası verildi.`))
    await client.channels.cache.get(config.Log.CezaPuanLog).send(`${uye}: aldığınız **#${cezaID}**  ID'li ceza ile **${cpuan}** ceza puanına ulaştınız.`)

    setTimeout(async() => {
        let vmuteli = db.fetch(`vmuteli.${uye.id}.${message.guild.id}`)
        if(!vmuteli) return;
        if(vmuteli == 'vmuteli') {
            client.channels.cache.get(config.Log.VMuteLog).send(new MessageEmbed().setColor("GREEN").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${uye} (\`${uye.id}\`) adlı kullanıcı ses kanallarında susturulması bitti. \n

            • Yetkili: ${message.author} (\`${message.author.id}\`)
            • Cezalı: ${uye} (\`${uye.id}\`)
            • Süre: \`${zaman}\`
            • Mute Atılma: \`${voiceatılma}\`
            • Mute Bitiş: \`${voicebitiş}\`
        
            • Sebep: \`${sebep}\``))
            await db.delete(`vmuteli.${uye.id}.${message.guild.id}`)
            await db.delete(`süre.${uye.id}.${message.author.id}`)
            await uye.roles.remove(config.Roller.VMuted)

        }
    }, ms(zaman));
};

module.exports.config = { 
    name: 'vmute',
    aliases: ['v-mute','voicemute']
};