module.exports = {
  name: "messageReactionAdd",
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
        )
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add("778020273601249312");
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  },
};
