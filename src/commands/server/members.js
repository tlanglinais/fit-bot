const PREFIX = process.env.PREFIX;

module.exports = {
  name: "members",
  description: "Display the total number of members in the server.",
  guildOnly: true,
  format: `${PREFIX}members`,
  execute: async (message, args) => {
    try {
      return await message.channel.send(
        `Total members: ${message.guild.memberCount}`
      );
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  },
};
