const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const ms = require("ms")
const db = require("croxydb")
exports.run = async (client, message, args) => {
const embed = new EmbedBuilder()
.setTitle("Godzilla - Kurulum Yardımcısı!")
.setDescription("Bir çekiliş oluşturmak için aşağıdaki formu doldurabilirsin.")
.setColor("#5865f2")
const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setEmoji("<:tadilat:837344627157762068>")
.setCustomId("giveaways")
.setStyle(Discord.ButtonStyle.Primary)
)
message.channel.send({embeds: [embed], components: [row]})
db.set(`sahip_${message.channel.id}`, message.author.id)
}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "başlat"
};
