const mongoose = require("mongoose");

const ServerConfigSchema = new mongoose.Schema({
  serverId: {
    type: String,
    required: true,
    unique: true,
  },
  commandPrefix: {
    type: String,
    required: true,
    default: "!",
  },
  defaultRole: {
    type: String,
  },
  memberLogChannel: {
    type: String,
  },
});

module.exports = mongoose.model("ServerConfig", ServerConfigSchema);
