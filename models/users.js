const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    }
},{timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;
