const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT,config.Yetkili.registerYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("RANDOM").setTimestamp();

    let uye = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`);
    let data = db.get(`moderasyon.${uye.id}.${message.guild.id}`) || [];
    
    let sicil = data.length > 0 ? data.map((value, index) => `\`${index+1}.\`${client.users.cache.get(value.Yetkili) || value.Yetkili} tarafından [**${value.Sebep}**] sebebiyle cezalandırılmış.  `).join("\n") : "Bu Üyenin Ceza Bilgisi Bulunamadı."

    const embed2 = embed.setDescription(`${sicil}`);
    if(cpuan > 0){
    embed2.addField(`Ceza Puanı ;`, `\n ${uye} adlı üyenin toplam ceza puanı; ${cpuan || '0'}`)

}
    message.channel.send(embed2)

};

module.exports.config = { 
    name: 'sicil',
    aliases: ['geçmiş']
};