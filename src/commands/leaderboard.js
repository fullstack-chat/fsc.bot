const xpService = require("../services/xpService");

const helpText = `
  Command: leaderboard
  Description: The 'leaderboard' command fetches the top 5 users by XP
  Subcommands: none
  Examples:
    - Input: !fsc leaderboard
      Output: 1. Diamond - 9000XP
              2. The Captain - 1337XP
              3. PapaMelee - 1337XP
              4. Brianmmdev - 100XP
              5. Schwab - 0XP
`;

module.exports = {
  command: "leaderboard",
  isEnabled: true,
  helpText,
  fn: async (msg) => {
    let leaderboard = await xpService.getLeaderboard();
    if (leaderboard) {
      let embed = {
        embeds: [
          {
            title: "FSC XP Leaderboard",
            description:
              `1.    **${leaderboard[0].username}** - ${leaderboard[0].currentXp} **XP**\n
              2.   **${leaderboard[1].username}** - ${leaderboard[1].currentXp} **XP**\n
              3.   **${leaderboard[2].username}** - ${leaderboard[2].currentXp} **XP**\n
              4.   **${leaderboard[3].username}** - ${leaderboard[3].currentXp} **XP**\n
              5.   **${leaderboard[4].username}** - ${leaderboard[4].currentXp} **XP**\n`,
            color: 4382516,
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
