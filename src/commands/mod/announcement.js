const PREFIX = process.env.PREFIX;
const { errorMessage } = require("../../utils/messages");

module.exports = {
  name: "members",
  description: "Command to post an announcement, notifying all server members.",
  guildOnly: true,
  args: true,
  format: `${PREFIX}announcement <announcement>`,
  execute: async (message, args) => {
    try {
      return await message.channel.send(`ANNOUNCEMENT!`);
    } catch (error) {
      console.log(errorMessage(error));
    }
  },
};

// case "announce":
//   if (message.member.hasPermission("ADMINISTRATOR"))
//     return webhookClient.send(args.join(" "));
//   return;
