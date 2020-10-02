const xpService = require("../services/xpService");

const helpText = `
  Command: leaderboard
  Description: The 'leaderboard' command fetches the top 5 users by XP
  Subcommands: none
  Examples:
    - Input: !fsc leaderboard
      Output: @brianmmdev You are level 15 with 1445xp
`;

module.exports = {
  command: "leaderboard",
  isEnabled: true,
  helpText,
  fn: async (msg) => {
    let leaderboard = xpService.getLeaderboard();
    if (leaderboard) {
      let embed = {
        embeds: [
          {
            title: "FSC XP Leaderboard",
            description:
              `1.    **${leaderboard[0].username}** - ${leaderboard[0].currentXP} **XP**\n
              2.   **${leaderboard[1].username}** - ${leaderboard[1].currentXP} **XP**\n
              3.   **${leaderboard[2].username}** - ${leaderboard[2].currentXP} **XP**\n
              4.   **${leaderboard[3].username}** - ${leaderboard[3].currentXP} **XP**\n
              5.   **${leaderboard[4].username}** - ${leaderboard[4].currentXP} **XP**\n`,
            color: 4382516,
            footer: {
              text: "Skeletor Forever 💀",
            },
            timestamp: "2020-10-02T19:21:00.000Z",
          },
        ],
      };

      msg.reply(embed);
    } else {
      msg.reply("Oops, the leaderboard has gone missing, try again later.");
    }
  },
};
