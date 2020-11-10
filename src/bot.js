require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");
const { Client, WebhookClient } = Discord;
const client = new Client();
client.commands = new Discord.Collection();
const { capitalizeEveryWord } = require("./helpers");

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);

const fs = require("fs");
const path = require("path");

const commandFiles = fs
  .readdirSync(path.resolve(__dirname, "commands"))
  .filter(file => file.endsWith(".js"));

for (const fileName of commandFiles) {
  const command = require(`./commands/${fileName}`);

  client.commands.set(command.name, command);
}

client.on("ready", () =>
  console.log(`'${client.user.username}' has logged in.`)
);

client.on("message", async message => {
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
    return;

  try {
    const [CMD, ...args] = message.content
      .trim()
      .substr(prefix.length)
      .split(/\s+/);

    switch (CMD) {
      case "heartbeat":
        client.commands.get(CMD).execute(message, args);

      // case "members":
      //   return message.channel.send(
      //     `Total members: ${message.guild.memberCount}`
      //   );

      // case "announce":
      //   if (message.member.hasPermission("ADMINISTRATOR"))
      //     return webhookClient.send(args.join(" "));
      //   return;

      // case "kick":
      //   if (!args[0]) return message.reply("Please provide a valid @mention.");

      //   const userToKick = message.mentions.users.first();
      //   const member = message.guild.member(userToKick);

      //   if (member) {
      //     // await member.kick();
      //     await message.channel.send(
      //       `${member.user} was kicked from the server ${args
      //         .slice(1)
      //         .join(" ")}`
      //     );
      //   } else
      //     message.reply(`Member not found. Please provide a valid @mention.`);
      //   break;

      // case "ban":
      //   if (!args[0]) return message.reply("Please provide a valid @mention.");

      //   const userToBan = message.mentions.users.first();
      //   // const member = message.guild.member(userToKick);

      //   if (userToBan) {
      //     await userToBan.kick();
      //     await message.channel.send(
      //       `${member.user} was kicked from the channel.`
      //     );
      //   } else
      //     return message.reply(
      //       `Member not found. Please provide a valid @mention.`
      //     );
      //   // message.channel.send(`Banned ${userToBan} from the channel.`);
      //   break;

      // case "help":
      //   return message.channel.send(
      //     "Please visit this url to view all server commands: https://github.com/tlanglinais"
      //   );

      // case "weather":
      //   const zip = args[0];
      //   const validZip = /\d{5}/.test(zip);

      //   if (validZip) {
      //     const { weather, main } = await (
      //       await fetch(
      //         `https://api.openweathermap.org/data/2.5/weather?zip=${args[0]},us&appid=${process.env.WEATHER_API_KEY}&units=imperial`
      //       )
      //     ).json();
      //     return await message.reply(
      //       `Current weather for ${zip}: ${capitalizeEveryWord(
      //         weather[0].description
      //       )} with a temp of ${main.temp}°F.`
      //     );
      //   } else {
      //     return message.reply("Hey, please provide a valid US zip code!");
      //   }

      // case "prune":
      //   const amount = parseInt(args[0]);

      //   if (isNaN(amount))
      //     return message.reply("Hey now, please provide a number.");
      //   if (amount < 2) return message.reply("The minimum prune amount is 2.");
      //   else if (amount > 100)
      //     return message.reply("The maximum prune amount is 100.");

      //   return await message.channel.bulkDelete(amount, true);

      default:
        return message.reply("I don't recognize that command :(");
    }
  } catch (error) {
    console.log(error.message);
    switch (error.message) {
      case "Missing Permissions":
        message.reply(`Oh no, I ran into a permissions problem.`);
        break;
      case "Unknown User":
        message.reply(`Unknown User, please provide a valid user.`);
        break;
    }
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
