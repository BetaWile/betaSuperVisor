const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const config = require('../../Settings/Config.json');
const db = require("quick.db");
const moment = require("moment")
require('moment-duration-format');

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)

    let embed = new MessageEmbed().setColor("BLUE").setAuthor(message.member.nickname, message.author.avatarURL());
    let data = db.get(`snipe.${message.guild.id}`);
    if(!data) return message.react(config.Diger.red)
    message.channel.send(embed.setDescription(`
    \`Yazan Kişi:\` <@!${data.mesajyazan}>
    \`Mesaj:\` (**${data.mesaj}**)
    \`Silinme Tarihi:\` ${moment.duration(Date.now() - data.starihi).format("D [gün], H [saat], m [dakika], s [saniye]")}
    \`Kanal:\` <#${data.kanal}>
`)).then(x => x.delete({timeout: 15000}));
};

module.exports.config = { 
    name: 'snipe',
    aliases: ['snipe']
};  