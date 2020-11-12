require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const Discord = require("discord.js");
const { Client, WebhookClient } = Discord;
const client = new Client();
client.commands = new Discord.Collection();

const prefix = process.env.PREFIX || "!";

const webhookClient = new WebhookClient(
  process.env.WEBHOOK_ID,
  process.env.WEBHOOK_TOKEN
);

client.on("ready", () =>
  console.log(`'${client.user.username}' has logged in.`)
);

client.on("message", async message => {
  let msgPrefix = message.content[0];
  console.log(msgPrefix);

  if (message.author.bot || (msgPrefix !== prefix && msgPrefix !== "?")) return;

  const args = message.content.trim().split(/\s+/);
  const commandName = args.shift().substr(msgPrefix.length);

  if (!client.commands.has(commandName))
    return message.reply("I don't recognize that command :(");

  const command = client.commands.get(commandName);

  // if()

  // Check if args are required and user provided them
  if (command.args && !args.length)
    return message.reply(
      `You didn't provide the correct arguments.The command should look like this:\n${command.format}`
    );

  // check if command is guild specific and if message is a DM
  if (command.guildOnly && message.channel.type === "dm")
    return message.reply("I can't do that inside DMs!");

  try {
    command.execute(message, args);
  } catch (error) {
    console.log(error.message);
    message.reply(`Error: ${error.message}`);
  }

  // default:
  // return message.reply("I don't recognize that command :(");
  // }
  // } catch (error) {
  //   console.log(error.message);
  //   switch (error.message) {
  //     case "Missing Permissions":
  //       message.reply(`Oh no, I ran into a permissions problem.`);
  //       break;
  //     case "Unknown User":
  //       message.reply(`Unknown User, please provide a valid user.`);
  //       break;
  //   }
  // }
});

client.on("guildMemberAdd", member => {});

// ============ Load all command files into client.commands ============ //
(async function loadCommands(dir = "commands") {
  try {
    let files = await fs.readdir(path.join(__dirname, dir));

    for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        loadCommands(path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const command = require(path.join(__dirname, dir, file));
          client.commands.set(command.name, command);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
})();

// ============ Bot login ============ //

client.login(process.env.DISCORDJS_BOT_TOKEN);
