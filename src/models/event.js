// npm installed 
const mongoose = require('mongoose');

const eventModel = mongoose.model('event',{
    eventName : {
        type : String,
        required : true,
        trim : true,
        minlength : 2,
        maxlength : 50,
    },
    startingDateTime : {
        type : Date,
        required : true,
    },
    endingDateTime : {
        type : Date,
        required : true,
    },
})

module.exports = eventModel;