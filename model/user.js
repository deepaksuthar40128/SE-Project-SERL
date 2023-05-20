const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    role:{
        type:String,
    }
});

module.exports = mongoose.model('users', userSchema);