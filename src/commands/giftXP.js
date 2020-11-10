const security = require("../security");
const xpService = require("../services/xpService");

module.exports = {
  command: "gift",
  isEnabled: true,
  shouldCleanup: true,
  fn: async (msg) => {
    //!fsc gift @Schwab 100
    let args = msg.content.split(" ");

    let targetUser = message.mentions.members.first();

    let newXp = args[3];

    let isMod = await security.isMod(msg, msg.author.id);
    if (isMod) {

      xpService.giftXP(msg, targetUser.id, targetUser.username, newXp)
      msg.channel.send(`**${targetUser.username}** has been gifted ${xpAmount} from ${msg.author}`);
      
    } else {
      msg.author.send("You are not permitted to use the '!fsc give' command..");
    }
  },
};
