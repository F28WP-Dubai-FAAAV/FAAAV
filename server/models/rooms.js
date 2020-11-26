const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomsSchema = new Schema(
  {
    roomId:{
        type: String,
        required: true
    },
    players:{
        type: Array,
        required: true
    },
    isPlaying:{
      type: Boolean,
      required: true
    }
  }
);

const Rooms = mongoose.model("Rooms", roomsSchema);

module.exports = Rooms;
