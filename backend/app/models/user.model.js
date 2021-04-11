const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    realname: {
        type: String,
        required: true
    },
    sex: {
        type: Boolean,
        required: true
    },
    mail: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
    },
    birthday: {
        type: Date,
    }
});

const User = mongoose.model('User', UserSchema)

module.exports = User;
