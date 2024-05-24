const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        require :true,
        ref : "User",    // Usermodel ke user ki id lega uske ref se
    },
    product : {
        type : String,
        require : [true , "Please Select Product"],
        enum : ["iPhone" , "iMac" , "iPad" , "Macbook" , "iWatch"],
    },
    description : {
        type : String,
        require : [true, "Please Described Your Issue!"]
    },
    status : {
        type : String,
        require : true,
        enum : ['open' , 'new' , 'close'],
        default : "open",
    },

},
{
    timestamps : true,
});

module.exports = mongoose.model("Ticket" , ticketSchema);