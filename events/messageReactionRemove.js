const { errorMessage } = require("../utils/messages");

module.exports = {
  name: "messageReactionRemove",
  execute: async (client, reaction, user) => {
    try {
      // check if partial, if yes then fetch the rest
      if (reaction.partial) await reaction.fetch();
      if (reaction.message.partial) await reaction.message.fetch();

      // is the message in the 'rules' channel
      if (reaction.message.channel.id === "775788404360085531") {
        if (
          reaction.message.id === "778018844270133290" &&
          reaction.emoji.name === "👍"
        ) {
          let member = reaction.message.guild.members.cache.get(user.id);
          console.log("Member was found in the cache.");

          if (!member) {
            console.log("Member not found in the cache.");
            member = await reaction.message.guild.members.fetch(user.id);
          }

          await member.roles.remove("778020273601249312");
        }
      }
    } catch (error) {
      console.log(errorMessage(error));
    }
  },
};
