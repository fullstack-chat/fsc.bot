require('custom-env').env(true)
console.log('Starting with env: ', process.env)

const Discord = require("discord.js");
const client = new Discord.Client();
const xpService = require('./services/xpService')
const portfolioService = require('./services/portfolioService')
const security = require('./security')
const { parseCommands } = require('./helpers')

let commands = {}

client.on("ready", async () => {
  try {
    await xpService.init()
    await portfolioService.init()
    commands = await parseCommands('./src/commands')
  } catch (err) {
    console.error("Init failed:", err)
  }
  console.log(`${client.user.username} is ready!`)
});

client.on("error", (e) => {
  console.log(`${client.user.username} borked: ${e}`);
});

client.on('guildMemberAdd', async member => {
  await security.sendModBroadcast(member.guild, `**${member.user.username}** just joined **${member.guild.name}**!`)
});

client.on("message", async (message) => {
  if(message.author.bot) {
    return;
  }
  
  if(process.env.IS_XP_ENABLED !== "false") {
    xpService.logXp(message, message.author.id, message.author.username)
  }

  if(message.content.startsWith(process.env.PREFIX)) {
    const cmd = message.content.split(' ')[1];

    if (commands[cmd] === undefined) {
      console.log('Unable to find command', cmd)
      console.log('Commands are:\n')
      Object.keys(commands).forEach(c => console.log(c))
      return
    }

    console.log('cmd is', cmd)

    commands[cmd](message);
  }
});

client.login(process.env.BOT_TOKEN);
