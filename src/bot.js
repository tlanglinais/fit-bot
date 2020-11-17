require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["CHANNEL", "MESSAGE", "REACTION", "GUILD_MEMBER"],
});
client.commands = new Discord.Collection();

// ============ Attach all files to client object ============ //
(async () => {
  const { loadCommands, loadEvents } = require("./utils/loaders");

  await loadCommands(client);
  await loadEvents(client);
})();

client.on("ready", () => {
  console.log(`'${client.user.username}' has logged in.`);
});

// ============ Bot login ============ //
client.login(process.env.DISCORDJS_BOT_TOKEN);
