const Discord = require("discord.js");
const PREFIX = process.env.PREFIX;

module.exports = {
  name: "commands",
  description: "Sends a DM to the user with all server commands.",
  format: `${PREFIX}commands`,
  execute: async (message, args) => {
    try {
      const { commands } = message.client;

      const commandNames = commands.map(command => command.name).sort();

      const embed = new Discord.MessageEmbed()
        .setColor("#1eff12")
        .setTitle(`Commands`)
        .setDescription(
          `Type the server prefix (${PREFIX}) then the command name. See below.`
        )
        .addFields(
          {
            name: "Commands: ",
            value: commandNames,
            inline: true,
          },
          {
            name: "Usage: ",
            value: commandNames.map(command => `${PREFIX}${command}`),
            inline: true,
          },
          {
            name: "More Info: ",
            value: commandNames.map(command => `?${command}`),
            inline: true,
          }
        )
        .setTimestamp(new Date());

      return await message.author
        .send(embed)
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
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  },
};
