module.exports = {
  name: "guildMemberAdd",
  execute: async (client, member) => {
    try {
      console.log(`[guildMemberAdd.js] Hello ${member}!`);
      const channel = member.guild.channels.cache.find(
        ch => ch.name === "welcome"
      );

      console.log(channel);

      if (!channel) return;

      channel.send(`Welcome to the server, ${member}`);
    } catch (error) {
      console.log(error.message);
    }
  },
};
