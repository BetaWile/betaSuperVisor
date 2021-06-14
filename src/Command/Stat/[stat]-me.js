const { MessageEmbed } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const db = require('quick.db');

const moment = require('moment');
require('moment-duration-format');
moment.locale('tr');

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)

let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
let dataMessage = await db.get(`messageData.${member.id}.channel`) || {};
let dataVoice = await db.get(`voiceData.${member.id}.channel`) || {};
let messageData = Object.keys(dataMessage).map(id => {
    return {
        channelID: id,
        totalMessage: dataMessage[id]
    }
}).sort((a, b) => b.totalMessage - a.totalMessage);

let voiceData = Object.keys(dataVoice).map(id => {
    return {
        channelID: id,
        totalTime: dataVoice[id]
    }
}).sort((a, b) => b.totalTime - a.totalTime);

let dataMessage0 = await db.get(`messageData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];
let dataVoice0 = await db.get(`voiceData.${member.id}.times`) || [{ time: 0, puan: 0 }, { time: 0, puan: 0 }];
let messageData0 = Object.values(dataMessage0).map(id => {
    return {
        time: id.time,
        puan: id.puan
    };
})
let voiceData0 = Object.values(dataVoice0).map(id => {
    return {
        time: id.time,
        puan: id.puan
    };
})

let message14 = messageData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
let message7 = messageData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
let message24 = messageData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
let totalmessage = messageData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

let ses14 = voiceData0.filter(data => (Date.now() - (86400000 * 30)) < data.time).reduce((a, b) => a + b.puan, 0);
let ses7 = voiceData0.filter(data => (Date.now() - (86400000 * 7)) < data.time).reduce((a, b) => a + b.puan, 0);
let ses24 = voiceData0.filter(data => (Date.now() - 86400000) < data.time).reduce((a, b) => a + b.puan, 0);
let totalVoice = voiceData0.filter(data => (Date.now())).reduce((a, b) => a + b.puan, 0);

if(member === message.author){

    const embed = new MessageEmbed()
    .setColor(message.member.displayHexColor)
    .setAuthor(message.member.nickname, message.author.displayAvatarURL({dynamic:true , size :2048}))
    .setThumbnail(member.avatarURL({ dynamic: true }))
    .setDescription(`${member} - **(\`${member.id}\`)**\n\nSon 14 Gün içindeki kullanıcı ses ve chat istatistikleri.
   
    **__Toplam ses istatistikleri:__** 
    • \`${moment.duration(totalVoice).format("HH [Saat], mm [Dakika]")}\`
     **__Toplam text istatistikleri:__** 
    • \`${totalmessage} mesaj\`
   
    **__Günlük Ses Ve Text İstatistikleri:__**
    ⦁ **Text**: \`${message24} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses24).format("HH [Saat], mm [Dakika]")}\`
    **__Haftalık Ses Ve Text İstatistikleri:__**
    ⦁ **Text**: \`${message7} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses7).format("HH [Saat], mm [Dakika]")}\`
    **__Aylık Ses Ve Text İstatistikleri:__**
    ⦁ **Text**: \`${message14} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses14).format("HH [Saat], mm [Dakika]")}\`
   
     __**Aktif Olduğu Ses kanalı:**__
    ⦁ ${voiceData[0] ? `<#${voiceData[0].channelID}>` : 'Veri Yok!'}: \`${voiceData[0] ? moment.duration(voiceData[0].totalTime).format("HH [Saat], mm [Dakika]") : 'Veri Yok!'}\`
     __**Aktif Olduğu Text kanalı:**__
    ⦁ ${messageData[0] ? `<#${messageData[0].channelID}>` : "Veri Yok"}: \`${messageData[0] ? messageData[0].totalMessage : 0} Mesaj\``)
message.channel.send(embed);

} else {

    const embed = new MessageEmbed()
    .setColor(member.displayHexColor)
    .setAuthor(member.nickname, member.user.displayAvatarURL({dynamic:true , size :2048}))
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setDescription(`${member} - **(\`${member.id}\`)**\n\nSon 14 Gün içindeki kullanıcı ses ve chat istatistikleri.
   
    **__Toplam ses istatistikleri:__** 
    • \`${moment.duration(totalVoice).format("HH [Saat], mm [Dakika]")}\`
     **__Toplam text istatistikleri:__** 
    • \`${totalmessage} mesaj\`
   
    **__Günlük Ses Ve Text İstatistikleri:__**
    ⦁ **Text**: \`${message24} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses24).format("HH [Saat], mm [Dakika]")}\`
    **__Haftalık Ses Ve Text İstatistikleri:__**
    ⦁ **Text**: \`${message7} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses7).format("HH [Saat], mm [Dakika]")}\`
    **__Aylık Ses Ve Text İstatistikleri:__**
    ⦁ **Text**: \`${message14} mesaj\`
    ⦁ **Voice**: \`${moment.duration(ses14).format("HH [Saat], mm [Dakika]")}\`
   
     __**Aktif Olduğu Ses kanalı:**__
    ⦁ ${voiceData[0] ? `<#${voiceData[0].channelID}>` : 'Veri Yok!'}: \`${voiceData[0] ? moment.duration(voiceData[0].totalTime).format("HH [Saat], mm [Dakika]") : 'Veri Yok!'}\`
     __**Aktif Olduğu Text kanalı:**__
    ⦁ ${messageData[0] ? `<#${messageData[0].channelID}>` : "Veri Yok"}: \`${messageData[0] ? messageData[0].totalMessage : 0} Mesaj\``)
message.channel.send(embed);
};

};

module.exports.config = { 
    name: 'stat',
    aliases: ['stat']
};