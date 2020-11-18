const PREFIX = process.env.PREFIX;
const { invalidPermissions, errorMessage } = require("../../utils/messages");

module.exports = {
  name: "reaction",
  description:
    "Make the bot react to a specific message with the specified emoji.",
  guildOnly: true,
  format: `${PREFIX}reaction <channelID> <messageID> <reaction>`,
  execute: async (message, args) => {
    try {
      if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
        const channelID = args[0];
        const messageID = args[1];
        const emoji = args[2];

        const guild = await message.guild.fetch();

        const channel = guild.channels.cache.get(channelID);
        const messageToReact = await channel.messages.fetch(messageID);
        return await messageToReact.react(emoji);
      } else await message.reply(invalidPermissions);
    } catch (error) {
      console.log(errorMessage(error));
    }
  },
};
