const security = require('../security')

const helpText = `
  Command: skeletor
  Description: Skeletor's Secret Sauce.
`

module.exports = {
  command: 'skeletor',
  isEnabled: true,
  shouldCleanup: true,
  fn: async msg => {
    let isMod = await security.isMod(msg, msg.author.id)
    if(isMod) {
        msg.author.send("https://media.giphy.com/media/g7GKcSzwQfugw/giphy.gif")
    } else {
      return 
    }
  }
}