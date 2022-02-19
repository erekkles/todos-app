const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }

});

module.exports = mongoose.model('User', UserSchema);