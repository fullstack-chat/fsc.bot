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
    let userName = msg.content.split(' ')[2]

    let user = msg.guild.members.cache.find(member => member.username == userName)

    let currentXp = xpService.getXpForUserId(user.id)
    if(currentXp) {
      let currentLevel = xpService.getLevelForUserId(user.id)
      msg.reply(`${user.username} is level ${currentLevel} with ${currentXp}xp`)
    } else {
      msg.reply("This user doesn't exist.")
    }
  }
}