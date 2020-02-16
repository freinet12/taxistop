const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required.']
    },
    firstName: {
        type: String,
        required: [true, 'firstName is required.']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required.']
    },
    userName: {
        type: String,
        required: [true, 'userName is required.']
    },
    avatar: {
        type: String,
        default: '/default-avatar.jpg'
    },

});

const User = mongoose.model('user', UserSchema);
module.exports = User;