const Discord = require("discord.js");
const PREFIX = process.env.PREFIX;

module.exports = {
  name: "help",
  description: "Displays info about a specific commands.",
  format: `?<command>`,
  execute: async (message, commandName) => {
    try {
      const command = message.client.commands.get(commandName);

      const embed = new Discord.MessageEmbed()
        .setColor("#8d93ab")
        .setTitle(`Command: ${command.name}`)
        .addField("Description: ", command.description)
        .addField("Format: ", command.format)
        .setTimestamp(new Date());

      return message.channel.send(embed);
    } catch (error) {
      console.log(error.message);
    }
  },
};
