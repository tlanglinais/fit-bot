const Discord = require("discord.js");
const PREFIX = process.env.PREFIX;

module.exports = {
  name: "help",
  description: "Sends a DM to the user with all server commands.",
  format: `?<command>?`,
  execute: async (message, args) => {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Here's a list of my commands you can use:\n");
      data.push(commands.map(command => `${PREFIX}${command.name}`).join("\n"));
      data.push(
        `\nYou can send '${PREFIX}help [command]' to get more info on a specific command.`
      );

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === "dm") return;
          message.reply("I've sent you a DM with all my commands!");
        })
        .catch(error => {
          console.error(
            `Could not send help DM to ${message.author.tag}.\n`,
            error
          );
          message.reply(
            "it seems like I can't DM you. Do you have DMs disabled?"
          );
        });
    } else if (commands.has(args[0])) {
      const command = commands.get(args[0]);

      const embed = new Discord.MessageEmbed()
        .setColor("#28df99")
        .setTitle(`Command: ${PREFIX}${command.name}`)
        .addField("Description: ", command.description)
        .addField("Format: ", command.format)
        .setTimestamp(new Date());

      message.channel.send(embed);
    } else {
      message.reply("I don't recognize that command!");
    }
  },
};
