const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    let uye = message.mentions.users.first() || message.author;
    let top = message.guild.members.cache.filter(uye => db.get(`yetkili.${uye.id}.toplam`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2.id}.toplam`))-Number(db.get(`yetkili.${uye1.id}.toplam`))).slice(0, 15).map((uye, index) => (index+1)+" • <@"+ uye +"> | \`" + db.get(`yetkili.${uye.id}.toplam`) +"\` Kayıt.").join('\n');
    message.channel.send(new MessageEmbed().setAuthor(`Top Teyit Listesi`, message.guild.iconURL({dynamic: true})).setTimestamp().setColor("BLUE").setDescription(top));
};

module.exports.config = { 
    name: 'topteyit',
    aliases: ['top-teyit','kayıt-liste']
};