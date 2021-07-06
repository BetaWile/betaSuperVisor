const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED')
    if(![config.Yetkili.AbilityYT,config.Yetkili.jailYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(1).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))
    let vmuteli = db.fetch(`vmuteli.${uye.id}.${message.guild.id}`)
    if(!vmuteli) {
    if(vmuteli == 'vmuteli') {
        await db.delete(`vmuteli.${uye.id}.${message.guild.id}`)
        await db.delete(`süre.${uye.id}.${message.author.id}`)
    client.channels.cache.get(config.Log.VMuteLog).send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${uye} adlı kullanıcın ses mute cezası sunucuda kaldırıldı! \n

    • Yetkili: ${message.author} (\`${message.author.id}\`)
    • Kullanıcı: ${uye} (\`${uye.id}\`)
    • Sebep: \`${sebep}\``))
    await uye.roles.remove(config.Roller.VMuted)
    message.channel.send(yanlis.setDescription(`Başarıyla ${uye} Adlı üyenin sesli mutesini kaldırdınız.`)).then(x => x.delete({timeout: 2000}))
     } else {
        message.channel.send(yanlis.setDescription(`Kişinin voice mutesi bulunmuyor.`)).then(x => x.delete({timeout: 2000}))
     }
    }
};

module.exports.config = { 
    name: 'unvmute',
    aliases: ['sesli-kaldır','un-vmute']
};