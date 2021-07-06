const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RED')
    if(![config.Yetkili.AbilityYT,config.Yetkili.muteYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(1).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))

    let muteli = db.fetch(`muteli.${uye.id}.${message.guild.id}`)
    if(!muteli) {
    if(muteli == 'muteli'){
    db.delete(`muteli.${uye.id}.${message.guild.id}`)
    db.delete(`süre.${uye.id}.${message.author.id}`)
    client.channels.cache.get(config.Log.MuteLog).send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("GREEN").setDescription(`${uye} adlı kullanıcın mute cezası sunucuda kaldırıldı! \n

    • Yetkili: ${message.author} (\`${message.author.id}\`)
    • Kullanıcı: ${uye} (\`${uye.id}\`)
    • Sebep: \`${sebep}\``))
    await uye.roles.remove(config.Roller.Muted)
    message.channel.send(yanlis.setDescription(`${uye} Adlı kullanıcın mutesini kaldırıldı.`)).then(x => x.delete({timeout: 2000}))
    }} else {
        message.channel.send(yanlis.setDescription('Kişinin bir mutesi bulunmuyor.')).then(x => x.delete({timeout: 2000}))
    }

};

module.exports.config = { 
    name: 'unmute',
    aliases: ['umute','mute-kaldır']
};