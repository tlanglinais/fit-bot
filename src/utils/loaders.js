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

exports.loadEvents = async function loadEvents(client, dir = "../events") {
  try {
    let files = await fs.readdir(path.join(__dirname, dir));

    for (let file of files) {
      let stats = await fs.lstat(path.join(__dirname, dir, file));
      if (stats.isDirectory()) {
        loadEvents(client, path.join(dir, file));
      } else {
        if (file.endsWith(".js")) {
          const event = require(path.join(__dirname, dir, file));

          client.on(event.name, event.execute.bind(null, client));
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
