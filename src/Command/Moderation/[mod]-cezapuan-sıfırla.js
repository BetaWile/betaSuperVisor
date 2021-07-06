const { MessageEmbed, Message } = require('discord.js');
const Main = require('../../Settings/Settings.json');
const config = require('../../Settings/Config.json');
const db = require('quick.db')

module.exports.beta = async(client, message, args) => {

    if(![config.Yetkili.AbilityYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(config.Diger.red)

    let uye = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    let embed = new MessageEmbed().setColor("BLUE")

    const reactionFilter = (reaction, user) => {
        return ['✅'].includes(reaction.emoji.name) && message.author.id == user.id
      };
       message.channel.send({embed: embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true, size: 2048})).setDescription(`<@!${uye.id}> Adlı kulanıcının cezapuanını sıfırlanmasını onaylıyor musun ?`)}).then(async msj => {
        await msj.react('✅');
        msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        coll => coll.first().catch(err => { mesaj.delete().catch(); return; })
          let cevap = c.first();
      if (cevap) {
            db.delete(`cezapuan.${uye.id}.${message.guild.id}`);
            msj.edit(embed.setDescription(`${uye} Adlı kullanıcının başarıyla cezapuanı sıfırlandı.`)).then(e => e.reactions.removeAll())
            ;
      } else {
             msj.delete();
      message.channel.send(embed.setDescription(`**15** Saniye boyunca cevap gelmediği için otomatik olarak iptal edildi!`)).then(x => x.delete({timeout: 53000}));
      };
        });
      });
      
};

module.exports.config = { 
    name: 'cezapuansıfırla',
    aliases: ['cezapuansıfırla', 'cezapuan-sıfırla', 'cpuansıfırla']
};