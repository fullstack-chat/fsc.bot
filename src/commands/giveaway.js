const security = require('../security')
const xpService = require('../services/xpService')
const { rng } = require('../helpers')

const minimumLevel = 5

module.exports = {
  command: 'giveaway',
  isEnabled: true,
  shouldCleanup: true,
  fn: async msg => {
    let args = msg.content.split(' ')
    
    if(args[2] === 'select-winner') {
      let isMod = await security.isMod(msg, msg.author.id)
      if(isMod) {
        // Get users above level 5
        let eligibleUsers = xpService.getUsersAtOrAboveLevel(minimumLevel)
        console.log(eligibleUsers)
        let winnerIdx = rng(0, eligibleUsers.length)
        msg.author.send(`Selected giveaway winner is *${eligibleUsers[winnerIdx]}*`)
      } else {
        msg.author.send("You are not permitted to use the '!fsc portfolio init' command..")
      }
    }

  }
}