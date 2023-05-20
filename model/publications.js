const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    publications: {
        type: Array,
        
    }, DOIC: {
        type: Array,
        
    }, DONW: {
        type: Array,
        
    },
  
});

module.exports = mongoose.model('publication', userSchema);