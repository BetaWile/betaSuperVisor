const Discord = require("discord.js");

module.exports.beta = async(client, message, args) => {

if (!message.member.voice.channel) {
    return message.reply("Ses kanalında olman lazım!").then(m => m.delete,{timeout: 7000});;;
    }
    const filter = (reaction, user) => {
    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === kullanıcı.id;
    };
      
    let embed = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!kullanıcı) return message.channel.send('Bir Kullanıcı Belirt.').then(m => m.delete,{timeout: 7000});;;
    
    let rol = message.mentions.roles.first();
    let member = message.guild.member(kullanıcı);
    
    if (!member.voice.channel) return message.channel.send('Etiketlenen Kullanıcı Ses Kanalında Değil.').then(m => m.delete,{timeout: 7000});;
    
      
    let log = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setDescription(`${kullanıcı}, ${message.author} \`${kullanıcı.voice.channel.name}\` Odasına Gelmek İstiyor. Kabul Ediyormusun ?`)
      
    let mesaj = await message.channel.send(log)
    await mesaj.react("✅")
    await mesaj.react("❌")
    mesaj.awaitReactions(filter, {
    max: 1,
    time: 60000,
    errors: ['time']
    }).then(collected => {
    const reaction = collected.first();
    if (reaction.emoji.name === '✅') {
        mesaj.edit(embed.setDescription(`${kullanıcı} Odaya Gelmeni Onayladı.`).setColor("GREEN"))
    message.member.voice.setChannel(kullanıcı.voice.channel.id)
    } else {
     mesaj.edit(new Discord.MessageEmbed().setDescription(`${kullanıcı} Odaya Gelmeni Onaylamadı.`).setColor("RED"))
    }
    })};

    module.exports.config = { 
        name: 'git',
        aliases: ['git']
    };