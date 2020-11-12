const PREFIX = process.env.PREFIX;

module.exports = {
  name: "members",
  description: "Display the total number of members in the server.",
  guildOnly: true,
  format: `${PREFIX}members`,
  execute: async (message, args) => {
    return await message.channel.send(
      `Total members: ${message.guild.memberCount}`
    );
  },
};
