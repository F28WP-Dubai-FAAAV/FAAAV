//initializing objects for mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const playersSchema = new Schema(
  {
    username:{
        type: String,
        required: true
    },
    roomId:{
        type: String,
        required: true
    }
  }
);

const Players = mongoose.model("Players", playersSchema);

module.exports = Players;