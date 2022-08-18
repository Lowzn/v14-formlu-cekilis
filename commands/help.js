const { EmbedBuilder } = require("discord.js");

exports.run = async (client, message, args) => {

  const embed = new EmbedBuilder()
  .setColor("#EB459E")
  .setTitle(`Godzilla - Yardım Sistemi!`)
  .setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
  .setDescription("`!help`,`!başlat`,`!bitir`,`!reroll`") 
  .setTimestamp()  

  return message.reply({ embeds: [embed] })

};
exports.conf = {
  aliases: ["yardım"]
};

exports.help = {
  name: "help"
};