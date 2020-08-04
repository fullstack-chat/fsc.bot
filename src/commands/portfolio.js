const security = require('../security')
const portfolioService = require('../services/portfolioService')

module.exports = {
  command: 'portfolio',
  shouldCleanup: true,
  fn: async msg => {
    let args = msg.content.split(' ')
    if(args[2] === 'add') {
      if(args.length < 4) {
        msg.author.send("Please provide a url to add to the portfolio list. Format should be `!fsc portfolio add https://brianmorrison.me`");
      } else {
        await portfolioService.updatePortfolios(msg, msg.author.username, args[3])
      }
    }
    
    if(args[2] === 'init') {
      let isMod = await security.isMod(msg, msg.author.id)
      if(isMod) {
        await portfolioService.initMessage(msg);
      } else {
        msg.author.send("You are not permitted to use the '!fsc portfolio init' command..")
      }
    }
    
    msg.delete()
  }
}