const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports.beta = async(client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

if(args[0] == "hepsi"){
  db.delete(`messageData`);
  db.delete(`voiceData`);
  return message.channel.send(`Sunucudaki Tüm Veriler Başarılı Bir Şekilde Sıfırlandı.`)
} else if(args[0] == "yazı"){
  db.delete(`messageData`);
  return message.channel.send(`Sunucudaki Tüm Yazı Verileri Başarılı Bir Şekilde Sıfırlandı.`)
} else if(args[0] == "ses") {
   db.delete(`voiceData`);
   return message.channel.send(`Sunucudaki Tüm Ses Verileri Başarılı Bir Şekilde Sıfırlandı.`)
}
  const embed = new MessageEmbed()
  .setColor("GREEN")
  .setAuthor(message.author.username, message.author.avatarURL())
  .addField("Tüm Veriler İçin;", "!sıfırla hepsi")
  .addField("Ses Verileri İçin;", "!sıfırla ses")
  .addField("Yazı Verileri İçin;", "!sıfırla yazı")
  .setTimestamp()
  return message.channel.send(embed)
};

module.exports.config = { 
    name: 'statsıfırla',
    aliases: ['statsıfırla']
};