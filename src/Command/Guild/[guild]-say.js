const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const moment = require('moment');
const db = require('quick.db');

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT,config.Yetkili.BanYT,config.Yetkili.jailYT,config.Yetkili.muteYT,config.Yetkili.vmuteYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)


    const taglı = message.guild.members.cache.filter(r => r.user.username.includes(Main.Tag)).size
    const toplam = message.guild.memberCount
    const ses = message.guild.channels.cache.filter(channel => channel.type == 'voice').map(channel => channel.members.size).reduce((a,b) => a + b)

    message.channel.send(new MessageEmbed()
    .setColor("BLUE")
    .setDescription(`
    \`˃\` Sunucumuda **${toplam}** adet üye var.
    \`˃\` Şu anda toplam **${ses}** kişi seslide.
    \`˃\` Toplamda **${taglı}** kişi tagımızı alarak bizi desteklemiş.
`)
    );
};

module.exports.config = { 
    name: 'say',
    aliases: ['sunucu-istatik']
};