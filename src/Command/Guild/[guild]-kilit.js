const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const Main = require('../../Settings/Config.json');

module.exports.beta = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setFooter(Main.Footer)

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yanlis.setDescription('Gerekli yetkilere sahip değilsin.').setColor('RED')).then(x => x.delete({timeout: 2000}))

    if(db.get(`kilitli`)){
        message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true });
        message.react("🔓");
        db.delete(`kilitli`);
    } else {
        message.channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: false });
        message.react("🔒");
        db.set(`kilitli`, true);
    }
};

module.exports.config = { 
    name: 'kilit',
    aliases: ['kanal-kilitle']
};