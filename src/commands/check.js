const security = require("../security");
const xpService = require('../services/xpService')

const helpText = `
  Command: check
  Description: The 'check' command can be used to fetch a users current XP and level.
  Subcommands: none
  Examples:
    - Input: !fsc check
      Output: Schwab is level 10 with 169xp
`

module.exports = {
  command: 'check',
  isEnabled: true,
  helpText,
  fn: async msg => {
    let isMod = await security.isMod(msg, msg.author.id)
    if(isMod) {
        let user = msg.mentions.users.first()

        let currentXp = xpService.getXpForUserId(user.id)
        if(currentXp) {
          let currentLevel = xpService.getLevelForUserId(user.id)
          msg.reply(`${user.username} is level ${currentLevel} with ${currentXp}xp`)
        } else {
          msg.reply("This user doesn't exist.")
        }
    } else {
        msg.reply("Sup buddy, you gotta be a mod to use this command :)")
    }

  }
}