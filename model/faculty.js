const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    Address:{
        type:String,
    },
    position:{
        type:String,
    },
    profile:{
        type:String,
    },
    phone:{
        type:Number,
    },
    website:{
        type:Array,
    },
    personalEmail:{
        type:String,
    },
    researchers:{
        type:Array,
    },
    password:{
        type:String,
    }
    
},{
    timestamps:true,
});

module.exports = mongoose.model('faculties', userSchema);