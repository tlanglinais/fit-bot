const fs = require("fs").promises;
const path = require("path");

exports.loadCommands = async function loadCommands(
  client,
  dir = "../commands"
) {
  try {
    let files = await fs.readdir(path.join(__dirname, dir));

    for (let file of files) {
      let stat = await fs.lstat(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        loadCommands(client, path.join(dir, file));
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
};
