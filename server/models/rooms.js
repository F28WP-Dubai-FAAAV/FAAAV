//Schema of rooms
const mongoose = require("mongoose"); //mongoose object
const Schema = mongoose.Schema; //schema

//Schema of the Data
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
    },
    state:{
      type: Object
    }
  }
);

const Rooms = mongoose.model("Rooms", roomsSchema); //model of the rooms

module.exports = Rooms; //module assignment
