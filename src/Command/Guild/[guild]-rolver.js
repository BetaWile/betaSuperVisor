const { MessageEmbed } = require('discord.js');
const config = require("../../Settings/Config.json");

module.exports.beta = async(client, message, args) => {

    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("BLUE");
    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED');
    
    if(![config.Yetkili.AbilityYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red);
    
    const uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(yanlis.setDescription(`Lütfen Bir Üye Beiirtiniz!`)).then(beta => beta.delete({ timeout: 3000 }));
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rol => rol.name === args.slice(1).join(' '));
    if(!rol) return message.channel.send(yanlis.setDescription(`Lütfen Bir Role Belirtiniz!`)).then(betaa => betaa.delete({ timeout:3000 }));

    message.channel.send(embed.setDescription(`${uye} adlı kullancıya ${rol} rolü veridli!`));
    uye.roles.add(rol.id).catch();

    const Log = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setColor('GREEN')
    .setTitle("**Rol Verildi!**")
    .setDescription(`
    • Yetkili: ${message.author} (\`${message.author.id}\`)
    • Kullanıcı: ${uye} (\`${uye.id}\`)
    • Rol: ${rol} (\`${rol.id}\`)
    `)
    client.channels.cache.get(config.Log.RolLog).send(Log);
};

module.exports.config = { 
    name: 'rolver',
    aliases: ['rolver']
};