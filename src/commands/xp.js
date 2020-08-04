const xpService = require('../services/xpService')

module.exports = {
  command: 'xp',
  fn: async msg => {
    let currentXp = await xpService.getXpForUserId(msg.author.id)
    if(currentXp) {
      msg.reply(`Your current XP is: ${currentXp}`)
    } else {
      msg.reply("I cant find you :(")
    }
  }
}