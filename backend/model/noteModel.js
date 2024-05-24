const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true,
    },
    ticket : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Ticket",
        require : true,
    },
    description : {
        type : String,
        require : [true , "Please Fill Note"],
    },
},{
    timestamps : true
});

module.exports = mongoose.model("Note",noteSchema);