const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    isCompleted: {
        type: Boolean, 
        required: true
    }

});

module.exports = mongoose.model('Todo', TodoSchema);