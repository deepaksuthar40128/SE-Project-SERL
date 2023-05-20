const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
     enroll:{
        type:String,
    },
    about:{
        type:String,
    },
    profile:{
        type:String,
    },
    phones:{
        type:Array,
    },
    mentor:{
        type:String,
    },projects:{
        type:Array,
    },
    publications:{
        type:Array,
    },
    TA:{
        type:Array,
    }
},{timestamps:true});

module.exports = mongoose.model('researchers', userSchema);