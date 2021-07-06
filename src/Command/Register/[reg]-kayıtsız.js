const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED')
    let embed = new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic:true})).setColor('RANDOM')
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription(`Bir üye belirtmen gerekiyor.`))
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(yanlis.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))
    
    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let kayıttarihi = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    moment.locale("tr")

    await uye.setNickname(uye.user.username)
    await uye.roles.cache.has(config.Roller.Booster) ? uye.roles.set([config.Roller.Booster, config.Register.unreg]) : uye.roles.set([config.Register.unreg]);

    message.channel.send(embed.setDescription(`Kişi başarıyla kayıtsıza atıldı.`))
    client.channels.cache.get(config.Log.RegisterLog).send(new MessageEmbed().setAuthor(message.member.nickname, message.author.avatarURL()).setTitle("KAYITSIZA ATILDI!").setColor('PURPLE').setDescription(`• Yetkili: ${message.author} (\`${message.author.id}\`) \n • Kullanıcı: ${uye}(\`${uye.id}\`) \n • Verilen Roller: <@&${config.Register.unreg}> \n • Tarih: \`${kayıttarihi}\``))
};

module.exports.config = { 
    name: 'kayıtsız',
    aliases: ['unreg']
};