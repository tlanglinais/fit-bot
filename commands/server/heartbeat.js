const PREFIX = process.env.PREFIX;
const { errorMessage } = require("../../utils/messages");

module.exports = {
  name: "heartbeat",
  description: "Check to see if the bot is running.",
  format: `${PREFIX}heartbeat`,
  execute: async (message, args) => {
    try {
      return await message.channel.send("I'M ALIVE!");
    } catch (error) {
      console.log(errorMessage(error));
    }
  },
};
