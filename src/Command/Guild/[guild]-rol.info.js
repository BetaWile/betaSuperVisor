const Discord = require("discord.js");
const moment = require('moment');
module.exports.beta = async(client, message, args) => {
let embed = new Discord.MessageEmbed().setColor('#049FB6').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed.setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`)).then(x => x.delete({timeout: 5000}));
  
let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
if(!rol) return message.channel.send(embed.setDescription(`Geçerli bir rol belirtmelisin.`)).then(x => x.delete({timeout: 6500}))
let memberList = rol.members.map(m => `${m} - (\`${m.id}\`)`).join("\n")
let roleDate = moment(rol.createdAt)
let date = `${roleDate.format(`DD`)}/${roleDate.format(`MM`).replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")}/${roleDate.format(`YYYY`)} ${roleDate.format(`HH:mm`)}`
message.channel.send(embed.setColor(rol.hexColor).setDescription(`${rol} - (\`${rol.id}\`) rolünün bilgileri;
\`Rol Adı:\` ${rol.name}
\`Rol ID:\` ${rol.id}
\`Rol oluşturulma tarihi:\` ${date}
\`Roldeki kişi sayısı:\` ${rol.members.size}

*Rolde bulunan üyeleri listelemek için aşşağıdaki emojiye basmanız yeterli.*
`)).then(async msg => {
let emoji = "🔻"
await msg.react(emoji)
const qwe = (reaction, user) => reaction.emoji.name === emoji && user.id === message.author.id; 
const collector = msg.createReactionCollector(qwe, { time: 20000, max: 1 })

collector.on("collect", async() => {
 await msg.reactions.removeAll()
 if(memberList.length >= 2000) return msg.edit(embed.setDescription(`**Karakter sınırını aştığı için üyeleri sıralayamıyorum.**`))
 await msg.edit(embed.setDescription(`${rol} - (\`${rol.id}\`) rolündeki kişiler;

${memberList}`))
})
})
}

module.exports.config = { 
    name: 'rolbilgi',
    aliases: ['rol-info', 'rol-bilgi']
};