const prefix = process.env.PREFIX || "!";

module.exports.messageEvent = async message => {
  let msgPrefix = message.content[0];

  if (message.author.bot || (msgPrefix !== prefix && msgPrefix !== "?")) return;

  const args = message.content.trim().split(/\s+/);
  const commandName = args.shift().substr(msgPrefix.length);

  if (!client.commands.has(commandName))
    return message.reply("I don't recognize that command :(");

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

  // check if command is guild specific and if message is a DM
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
};
