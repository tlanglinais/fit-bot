const PREFIX = process.env.PREFIX;

module.exports = {
  name: "kick",
  description: "Kick someone from the server for the specified reason.",
  guildOnly: true,
  args: true,
  format: `${PREFIX}kick <@username> <reason>`,
  execute: async (message, args) => {
    const userToKick = message.mentions.users.first();
    const member = message.guild.member(userToKick);

    if (message.guild.member(message.author).hasPermission("KICK_MEMBERS")) {
      await member.kick();
      await message.channel.send(
        `${member.user} was kicked from the server ${args.slice(1).join(" ")}`
      );

      const logChannel = message.guild.channels.cache.get(
        process.env.BOT_LOG_ID
      );
      logChannel.send(
        `${message.author} kicked ${member.user} from the server ${args
          .slice(1)
          .join(" ")}`
      );
    } else message.reply(`You don't have permission to do that :/`);
  },
};
