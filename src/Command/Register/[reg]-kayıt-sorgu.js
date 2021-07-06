const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED')
    
    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    
    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;


        let erkek = db.fetch(`yetkili.${message.author.id}.erkek`);
        let kadın = db.fetch(`yetkili.${message.author.id}.kadın`);
        let kayıtlar = db.fetch(`yetkili.${message.author.id}.toplam`); 
        if(erkek === null) erkek = "0"  
        if(erkek === undefined) erkek = "0"
        if(kadın === null) kadın = "0"
        if(kadın === undefined) kadın = "0"
        if(kayıtlar === null) kayıtlar = "0"
        if(kayıtlar === undefined) kayıtlar = "0"


        const kaytlarbeta = new MessageEmbed()
        .setThumbnail(message.author.avatarURL({dynamic:true}))
        .setAuthor(message.author.username, message.author.avatarURL({dynamic:true}))
        .setDescription(`
        \`˃\` Toplam Kayıtların: \`${kayıtlar}\`
        \`˃\` Erkek Kayıtların: \`${erkek}\`
        \`˃\` Toplam Kadın Kayıtların: \`${kadın}\`
        `)
        message.channel.send(kaytlarbeta)
};

module.exports.config = { 
    name: 'kayıtlarım',
    aliases: ['kayıtlar','kstat']
};