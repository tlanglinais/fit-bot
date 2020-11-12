const PREFIX = process.env.PREFIX;
const permission = "BAN_MEMBERS";

module.exports = {
  name: "ban",
  description: "Ban someone from the server for the specified reason.",
  guildOnly: true,
  args: true,
  permission: permission,
  format: `${PREFIX}ban <@username> <reason>`,
  execute: async (message, args) => {
    const userToBan = message.mentions.users.first();
    const member = message.guild.member(userToBan);

    if (message.guild.member(message.author).hasPermission(permission)) {
      // await member.ban();
      await message.channel.send(
        `${member.user} was banned from the server ${args.slice(1).join(" ")}`
      );

      const logChannel = message.guild.channels.cache.get(
        process.env.BOT_LOG_ID
      );
      logChannel.send(
        `${message.author} banned ${member.user} from the server ${args
          .slice(1)
          .join(" ")}`
      );
    } else message.reply(`You don't have permission to do that :/`);
  },
};