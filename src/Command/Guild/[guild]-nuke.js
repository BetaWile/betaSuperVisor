const { MessageEmbed } = require('discord.js');

module.exports.beta = async(client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

 message.channel.clone().then(chnl => {
  let position = message.channel.position;
  chnl.setPosition(position);
  message.channel.delete();
});
  
};

module.exports.config = { 
    name: 'betanuke',
    aliases: ['betanuke']
};