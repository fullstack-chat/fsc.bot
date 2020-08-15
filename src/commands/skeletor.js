const security = require('../security')

const helpText = `
  Command: skeletor
  Description: Skeletor's Secret Sauce.
`

module.exports = {
  command: 'skeletor',
  isEnabled: true,
  helpText,
  shouldCleanup: true,
  fn: async msg => {
    let isMod = await security.isMod(msg, msg.author.id)
    if(isMod) {
        msg.channel.send("https://tenor.com/view/evil-laugh-laugh-evil-villain-skeletor-gif-4145131")
    } else {
      return 
    }
  }
}