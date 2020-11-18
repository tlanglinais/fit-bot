const fs = require("fs").promises;
const path = require("path");

exports.loadCommands = async function loadCommands(
  client,
  dir = "../commands"
) {
  try {
    let files = await fs.readdir(path.join(__dirname, dir));

    for (let file of files) {
      let stats = await fs.lstat(path.join(__dirname, dir, file));
      if (stats.isDirectory()) {
        // recursively get all files
        loadCommands(client, path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const command = require(path.join(__dirname, dir, file));
          // dynamically load module into client.commands
          client.commands.set(command.name, command);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loadEvents = async function loadEvents(client, dir = "../events") {
  try {
    let files = await fs.readdir(path.join(__dirname, dir));

    for (let file of files) {
      let stats = await fs.lstat(path.join(__dirname, dir, file));
      if (stats.isDirectory()) {
        // recursively get all files
        loadEvents(client, path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const event = require(path.join(__dirname, dir, file));

          // dynamically set listeners on all files
          client.on(event.name, event.execute.bind(null, client));
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
