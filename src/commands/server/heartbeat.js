const PREFIX = process.env.PREFIX;

module.exports = {
  name: "heartbeat",
  description: "Check to see if the bot is running.",
  format: `${PREFIX}heartbeat`,
  execute(message, args) {
    return message.channel.send("I'M ALIVE!");
  },
};
