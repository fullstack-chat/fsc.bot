const xpService = require('../services/xpService')

module.exports = {
  command: 'xp',
  fn: async msg => {
    let currentXp = xpService.getXpForUserId(msg.author.id)
    if(currentXp) {
      let currentLevel = xpService.getLevelForUserId(msg.author.id)
      msg.reply(`You are level ${currentLevel} with ${currentXp}xp`)
    } else {
      msg.reply("I cant find you :(")
    }
  }
}