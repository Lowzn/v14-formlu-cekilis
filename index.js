const { Client, EmbedBuilder, GatewayIntentBits, Partials, ButtonBuilder, ButtonStyle, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require("discord.js");
const Discord = require("discord.js")
const config = require("./config.js");
const ms = require("ms")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;
const db = require("croxydb")
client.db = db;
require("./events/message.js")
require("./events/ready.js")


const modal = new ModalBuilder()
.setCustomId('form')
.setTitle('Godzilla - Çekiliş Kurulum!')
  const a1 = new TextInputBuilder()
  .setCustomId('prize')
  .setLabel('Ödül')
  .setStyle(TextInputStyle.Paragraph) 
  .setMinLength(2)
  .setPlaceholder('Çekiliş Ödülü Ne Olacak?')
  .setRequired(true)
	const a2 = new TextInputBuilder() 
	.setCustomId('winners')
	.setLabel('Kazanan')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('Çekilişte Kaç Kazanan Olucak?')
	.setRequired(true)
	const a3 = new TextInputBuilder() 
	.setCustomId('zaman')
	.setLabel('Süre')
  .setStyle(TextInputStyle.Paragraph)  
	.setMinLength(1)
	.setPlaceholder('1s/1m/1h/1d')
	.setRequired(true)
	
    const row = new ActionRowBuilder().addComponents(a1);
    const row2 = new ActionRowBuilder().addComponents(a2);
    const row3 = new ActionRowBuilder().addComponents(a3);
    modal.addComponents(row, row2, row3);
  
   
client.on('interactionCreate', async (interaction) => {

	if(interaction.customId === "giveaways"){
    let sahip = db.fetch(`sahip_${interaction.channel.id}`)
    if(interaction.user.id !== sahip) return interaction.reply({content: `Bu butonu sadece çekilişi düzenleyen (<@${sahip}>) kullanabilir.`, ephemeral: true})
    await interaction.showModal(modal);
	}
})
client.on('interactionCreate', async interaction => {
  if (interaction.type !== InteractionType.ModalSubmit) return;
  if (interaction.customId === 'form') {


const prize = interaction.fields.getTextInputValue("prize")
const kazanan = interaction.fields.getTextInputValue('winners')
const time = interaction.fields.getTextInputValue('zaman')
let var1 = ms(time)
  
  let zaman = Date.now();

  let sure;
  let data
  try {
 data = ms(var1)
  } catch(err){
   interaction.reply("Girdiğin süre geçerli bir süre değil!")
  }
  if(data){
  let s = data.seconds;
  let m = data.minutes;
  let h = data.hours;
  let d = data.days;
  if (s) {
    sure = `${s} Seconds`;
  }
  if (m) {
    sure = `${m} Minutes`;
  }
  if (h) {
    sure = `${h} Hours`;
  }
  if (d) {
    sure = `${d} Days`;
  }
  let vars = await db.get(`cekilis.${interaction.guild.id}_${interaction.channel.id}`);
  if (!vars) {
    let embed = new EmbedBuilder()
      .setColor("#5865f2")
      .setTitle(prize)
      .setTimestamp()
.setDescription(`
Süre: <t:${Math.floor(Date.now()/1000) + Math.floor(var1/1000)}:R> (<t:${Math.floor(Date.now() /1000) + Math.floor(var1/1000)}:f>)
Düzenleyen: <@${interaction.user.id}>
Kazanan: ${kazanan}`);
interaction.reply({content: "Çekiliş Başarıyla Oluşturuldu.", ephemeral: true})
db.delete(`sahip_${interaction.channel.id}`)
    interaction.channel.send({embeds: [embed]}).then(mesaj => {
      mesaj.react("🎉");
      db.set(`cekilis.${interaction.guild.id}_${mesaj.id}`, interaction.user.id)
       db.set(`reroll_${interaction.guild.id}`, { channelID: interaction.channel.id, messageID: mesaj.id })
      db.set(`cekilis.${interaction.guild.id}_${interaction.channel.id}`, {
        kanalid: interaction.channel.id,
        mesajid: mesaj.id,
        hosted: interaction.user.id,
        sure: var1,
        zaman: zaman,
        toplam: kazanan,
        odul: prize
      });
    });
   
  } else {
    interaction.reply("Zaten Bu Kanalda Aktif Bir Çekilis Var!");
  }

  }
}

})
client.login(config.token)
client.on("ready", async () => {
   const moment = require("moment") 
   require("moment-duration-format")
   moment.locale("tr")
  setInterval(async () => {
    client.guilds.cache.map(async guild => {
      guild.channels.cache.map(async channel => {
        let data = db.get(`cekilis.${guild.id}_${channel.id}`);
        if (data) {
          let time = Date.now() - data.zaman;
          let sure = data.sure;
let kanal = guild.channels.cache.get(data.kanalid);
kanal.messages.fetch(data.mesajid).then(async mesaj => {
  let toplam = data.toplam
            })

          if (time >= sure) {
            
            let win = client.channels.cache.get(data.kanalid)
            if(win){
              win = await win.messages.fetch(data.mesajid).then(a => a.reactions.cache.get("🎉").users.fetch())
            } 
           if(win){
            let toplam = data.toplam
             
            let won = []
            let winner = []

            for(let i = 0; i < toplam; i += 1){
          await client.channels.cache.get(data.kanalid).messages.fetch(data.mesajid).then(a => a.reactions.cache.get("🎉").users.fetch()).then(a => a.map(u => {
            if (!u.bot) {
            won.push("<@"+ u.id + ">");
            db.push(`rerollusers_${data.mesajid}`, u.id);
            }}))

           let kazanan = won[Math.floor(Math.random() * won.length)]

            if(!winner.map(cs => cs).includes(kazanan))
            winner.push(kazanan)
            }
              
           
            
      
            kanal.messages.fetch(data.mesajid).then(async mesaj => {
              const Discord = require("discord.js")
             const row = new Discord.ActionRowBuilder()
             .addComponents(
             new Discord.ButtonBuilder()
               .setLabel("Reroll")
               .setStyle(Discord.ButtonStyle.Success)
               .setCustomId("reroll")
             )
              const embed = new EmbedBuilder()
                .setTitle(data.odul)
               .setColor("#5865f2")
                .setTimestamp()
              .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: ${winner.join(", ")}`)
            mesaj.edit({embeds: [embed], components: [row]})  
     
             if(winner.join(", ")){
            kanal.send(`Tebrikler ${winner} **${data.odul}** Kazandın!`)
            db.delete(`cekilis.${guild.id}_${channel.id}`);
            db.set(`son_${guild.id}_${channel.id}`, data.mesajid)
        
             } else {
                  db.delete(`cekilis.${guild.id}_${channel.id}`);
                 
                const embed = new EmbedBuilder()
                .setTitle(data.odul)
               .setColor("#5865f2")
              .setDescription(`
Sona Erdi: <t:${Math.floor(Date.now() /1000)}:R> (<t:${Math.floor(Date.now() /1000)}:f>)
Düzenleyen: <@${data.hosted}>
Kazanan: Bilinmiyor.`) 
mesaj.edit({embeds: [embed], components: []})
          
             }
                    })                                           
          
          }
        }
        }
      });
    });
  }, 5000);
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === "reroll") {
      let sahip = db.fetch(`cekilis.${interaction.guild.id}_${interaction.message.id}`)
      if(interaction.user.id !== sahip) return interaction.reply({content: `Bu butonu sadece çekilişi düzenleyen (<@${sahip}>) kullanabilir`, ephemeral: true})
        let data = db.get(`rerollusers_${interaction.channel.id}`)
          let kazanan = db.get(`rerollusers_${interaction.message.id}`)[
      Math.floor(Math.random() * db.get(`rerollusers_${interaction.message.id}`).length)
    ]

                    interaction.reply(`Tebrikler <@${kazanan}> Yeni Kazanan Sensin!`)
                  
                
            }
        })
        client.on('interactionCreate', async interaction => {
          if (!interaction.isButton()) return;
          if (interaction.customId === "rerolls") {
            let sahip = db.fetch(`cekilis.${interaction.guild.id}_${interaction.message.id}`)
            if(interaction.user.id !== sahip) return interaction.reply({content: `Bu butonu sadece çekilişi düzenleyen (<@${sahip}>) kullanabilir`, ephemeral: true})
              let data = db.get(`rerollusers_${interaction.channel.id}`)
                let kazanan = db.get(`kullanıcı_${interaction.message.id}`)[
            Math.floor(Math.random() * db.get(`kullanıcı_${interaction.message.id}`).length)
          ]
      
                          interaction.reply(`Tebrikler <@${kazanan}> Yeni Kazanan Sensin!`)
                        
                      
                  }
              })
 
          