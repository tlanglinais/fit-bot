const PREFIX = process.env.PREFIX;

module.exports = {
  name: "kick",
  description: "Kick someone from the server for the specified reason.",
  guildOnly: true,
  args: true,
  format: `${PREFIX}kick <@username> <reason?>`,
  execute: async (message, args) => {
    try {
      const userToKick = message.mentions.users.first();
      let member = message.guild.member(userToKick);
      // if (!member) {
      //   console.log("ID Provided");
      //   // member =
      // }

      if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) {
        await member.kick();
        await message.channel.send(
          `${member.user} was kicked from the server ${args.slice(1).join(" ")}`
        );

        const logChannel = message.guild.channels.cache.get(
          process.env.BOT_LOG_ID
        );
        await logChannel.send(
          `${message.author} kicked ${member.user} from the server ${args
            .slice(1)
            .join(" ")}`
        );
      } else await message.reply(`You don't have permission to do that :/`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  },
};
