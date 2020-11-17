const PREFIX = process.env.PREFIX;

module.exports = {
  name: "heartbeat",
  description: "Check to see if the bot is running.",
  format: `${PREFIX}heartbeat`,
  execute: async (message, args) => {
    try {
      return await message.channel.send("I'M ALIVE!");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  },
};
