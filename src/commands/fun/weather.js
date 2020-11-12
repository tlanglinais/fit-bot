const Discord = require("discord.js");
const PREFIX = process.env.PREFIX;
const fetch = require("node-fetch");
const { capitalizeEveryWord } = require("../../helpers");

module.exports = {
  name: "weather",
  description: "Show the weather for the specified US zip code.",
  args: true,
  format: `${PREFIX}weather <zip code>`,
  execute: async (message, args) => {
    const zip = args[0];
    const validZip = /\d{5}/.test(zip);

    if (validZip) {
      const { weather, main } = await (
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?zip=${args[0]},us&appid=${process.env.WEATHER_API_KEY}&units=imperial`
        )
      ).json();

      const embed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Current Weather")
        .addFields(
          { name: "Zip:", value: zip, inline: true },
          {
            name: "Description",
            value: `${capitalizeEveryWord(weather[0].description)}`,
            inline: true,
          },
          { name: "Temperature: ", value: `${main.temp}°F.`, inline: true }
        )
        .setTimestamp(new Date());

      message.channel.send(embed);
    } else {
      return message.reply("Hey, please provide a valid US zip code!");
    }
  },
};
