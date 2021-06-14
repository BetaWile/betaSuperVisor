const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)

        let dataMessage = await db.get(`messageData`) || {};

        const topMessage = Object.keys(dataMessage).map(id => {
            return {
                userID: id,
                data: Object.values(dataMessage[id].channel || {}).reduce((a, b) => a + b, 0)
            }
        }).sort((a, b) => b.data - a.data).slice(0, 20).map((data, i) => `⦁ ${message.guild.members.cache.get(data.userID)}: \`${data.data} Mesaj\``)


        const embed = new MessageEmbed()
            .setColor('#03003d')
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
            .addField("**Yazı kanalları sıralaması**", topMessage.length >= 1 ? topMessage : "Veri Yok!")
            .setTimestamp()
        return message.channel.send(embed)
    };

module.exports.config = { 
    name: 'toptext',
    aliases: ['toptext']
};