const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    projectData: {
        type: Array,
        
    }, resources: {
        type: Array,
        
    }, News: {
        type: Array,
    },
});

module.exports = mongoose.model('webdata', userSchema);