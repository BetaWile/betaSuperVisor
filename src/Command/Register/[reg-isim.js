const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED').setFooter(Main.Footer)
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let Name = args[1]
    let Age = args[2]
    if(!uye) return message.channel.send(yanlis.setDescription('Bir kullanıcı belirtmelisin. <@üye/ID>'))
    if(!Name || !Age ) return message.channel.send(yanlis.setDescription(`Yanlış kullanım. ${Main.Prefix}e <@üye/ID> <İsim> <Yaş>`))
    if(uye.id === message.author.id) return message.channel.send(yanlis.setDescription('Kendinizi kayıt edemezsiniz.'))
    if(uye.id === message.guild.ownerID ) return message.channel.send(yanlis.setDescription('Sunucu sahibini kayıt edemezsin.'))
    if(uye.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(yanlis.setDescription('Belirttiğiniz kullanıcı sizden Üst veya Aynı konumda bulunuyor.'))

    const İsim = `${uye.user.username.includes(Main.Tag) ? Main.Tag : Main.UnTag} ${Name} | ${Age}`

    await uye.setNickname(İsim);
    message.channel.send(new MessageEmbed().setFooter(Main.Footer).setColor('RANDOM')
    .setDescription(`${uye} Üyesinin ismini \`${İsim}\` olarak güncelledim.`)
    .setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
    )

    db.push(`isim.${uye.id}`, {
        userID: uye.id,
        isimleri: İsim,
        role: 'İsim Değiştirme',
        teyitciid: message.author.id,
        teyitcisim: message.author.username
    })
};

module.exports.config = { 
    name: 'isim',
    aliases: ['isim-değiştir','setnickname']
};