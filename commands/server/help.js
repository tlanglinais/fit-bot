const Discord = require("discord.js");
const { errorMessage, unknownCommand } = require("../../utils/messages");

module.exports = {
  name: "help",
  description: "Displays info about a specific commands.",
  // permissions: [""],
  format: `?<command>`,
  execute: async (message, commandName) => {
    try {
      const command = message.client.commands.get(commandName);
      if (!command) message.reply(unknownCommand);

      const embed = new Discord.MessageEmbed()
        .setColor("#8d93ab")
        .setTitle(`Command: ${command.name}`)
        .addField("Description: ", command.description)
        .addField("Format: ", command.format)
        .setTimestamp(new Date());

      return await message.channel.send(embed);
    } catch (error) {
      console.log(errorMessage(error));
    }
  },
};
