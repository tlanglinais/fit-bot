const PREFIX = process.env.PREFIX;

module.exports = {
  name: "members",
  description: "Command to post an announcement, notifying all server members.",
  guildOnly: true,
  args: true,
  format: `${PREFIX}announcement <announcement>`,
  execute: async (message, args) => {
    return await message.channel.send(`ANNOUNCEMENT!`);
  },
};

// case "announce":
//   if (message.member.hasPermission("ADMINISTRATOR"))
//     return webhookClient.send(args.join(" "));
//   return;
