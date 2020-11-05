const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TDMSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    property1: {
        type: String,
        required: true
    },
    property2: {
        type: String,
        required: true
    },
    property3: {
        type: String,
        required: true
    },
}, {timestamps: true });

const TDM = mongoose.model('TDM', TDMSchema);
module.exports = TDM;