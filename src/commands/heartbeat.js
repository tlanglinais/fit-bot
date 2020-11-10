module.exports = {
  name: "heartbeat",
  description: "Test to see if the bot is running.",
  execute(message, args) {
    return message.channel.send("I'M ALIVE!");
  },
};
