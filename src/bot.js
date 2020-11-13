require("dotenv").config();
const Discord = require("discord.js");
const { Client, WebhookClient } = Discord;
const client = new Client();
client.commands = new Discord.Collection();

const prefix = process.env.PREFIX || "!";

// const webhookClient = new WebhookClient(
//   process.env.WEBHOOK_ID,
//   process.env.WEBHOOK_TOKEN
// );

// ============ Attach all files to client object ============ //
(async () => {
  await require("./utils/loaders").loadCommands(client);
})();

client.on("ready", () => {
  console.log(`'${client.user.username}' has logged in.`);
});

client.on("message", async message => {
  let msgPrefix = message.content[0];

  if (message.author.bot || (msgPrefix !== prefix && msgPrefix !== "?")) return;

  const args = message.content.trim().split(/\s+/);
  const commandName = args.shift().substr(msgPrefix.length);

  if (!client.commands.has(commandName))
    return message.reply("I don't recognize that command 😕");

  // ============ Is it a help message? ============ //
  if (msgPrefix === "?") {
    const command = client.commands.get("help");
    return command.execute(message, commandName);
  }

  const command = client.commands.get(commandName);

  // ============ Check if args are required and provided ============ //
  if (command.args && !args.length)
    return message.reply(
      `You didn't provide the correct arguments.The command should look like this:\n${command.format}`
    );

  // check if command is guild specific && is a DM
  if (command.guildOnly && message.channel.type === "dm")
    return message.reply("I can't do that inside DMs!");

  try {
    command.execute(message, args);
  } catch (error) {
    console.log(error.message);
    switch (error.message) {
      case "Missing Permissions":
        message.reply(`Oh no, I ran into a permissions problem.`);
        break;
      case "Unknown User":
        message.reply(`Unknown User, please provide a valid user.`);
        break;

      default:
        message.reply(`Error: ${error.message}`);
    }
  }
});

client.on("guildMemberAdd", member => {});

// ============ Working Loader ============ //
// (async function loadCommands(dir = "commands") {
//   try {
//     let files = await fs.readdir(path.join(__dirname, dir));

//     for (let file of files) {
//       let stat = await fs.lstat(path.join(__dirname, dir, file));
//       if (stat.isDirectory()) {
//         loadCommands(path.join(dir, file));
//       } else {
//         if (file.endsWith(".js")) {
//           const command = require(path.join(__dirname, dir, file));
//           client.commands.set(command.name, command);
//         }
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })();

// ============ Bot login ============ //
client.login(process.env.DISCORDJS_BOT_TOKEN);
