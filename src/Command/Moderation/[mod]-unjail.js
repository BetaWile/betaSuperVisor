const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
    if(![config.Yetkili.AbilityYT,config.Yetkili.jailYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(1).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))
    let cezalı = db.fetch(`cezalı.${uye.id}.${message.guild.id}`)
    if(cezalı == 'cezalı') {
    await db.delete(`cezalı.${uye.id}.${message.guild.id}`)
    await db.delete(`süre.${uye.id}.${message.guild.id}`)
    client.channels.cache.get(config.Log.JailLog).send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("GREEN").setDescription(` ${uye} adlı kullanıcı sunucuda jaile atıldı! \n

    • Yetkili: ${message.author} (\`${message.author.id}\`)
    • Kullanıcı: ${uye} (\`${uye.id}\`)
    • Sebep: \`${sebep}\``))

    await uye.roles.remove(config.Roller.Jailed)
    await uye.roles.add(config.Register.unreg)
    message.channel.send(yanlis.setDescription(`Başarıyla ${uye} Adlı üyenin jail cezasını kaldırdınız.`)).then(x => x.delete({timeout: 2000}))
    } else {
        message.channel.send(yanlis.setDescription('Kişinin jail cezası bulunmuyor.')).then(x => x.delete({timeout: 2000}))
    }
};

module.exports.config = { 
    name: 'unjail',
    aliases: ['un-jail','cezakaldır']
};