const expressAsyncHandler = require("express-async-handler");
const Ticket = require('../model/ticketModel');
const User = require('../model/userModel');

// apn express-async-handler ko asyncHandler name se bnate the abhi direct liye he se liye
// express he kyuki khud express ka hi asynchandler he

// Get all tickets

const getTickets = expressAsyncHandler(async(req,res) =>{ 

    // GET USER USING ID IN REQ.USER
    const user = await User.findById(req.user._id);  // req.user authmiddleware me store 
                                        // karai thi sare value wo he pura data he usme

    if(!user)
    {
        res.status(401)
        throw new Error("User Not Found")
    }
    // console.log(req.user);

    const tickets = await Ticket.find({user : req.user._id});

    if(!tickets)
    {
        res.status(404)
        throw new Error("Tickets Not Found!")
    }

    res.status(200).json(tickets)

});

// Get Single ticket 

const getTicket = expressAsyncHandler(async(req,res) =>{

    // GET USER USING ID IN REQ.USER

    const user = await User.findById(req.user._id);

    if(!user)
    {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket)
    {
        res.status(404)
        throw new Error("Ticket Not Found!")
    }

    res.status(200).json(ticket);

});

// add ticket

const addTicket = expressAsyncHandler(async(req,res) =>{

    // GET USER USING ID IN REQ.USER

    const user = await User.findById(req.user._id);

    if(!user)
    {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const {product , description} = req.body;

    if(!product || !description)
    {
        res.status(401)
        throw new Error("Please Fill All Details!")
    }

    const newTicket = await Ticket.create({
        user : req.user._id,
        product,
        description,
        status : "open",
    })

    if(!newTicket)
    {
        res.status(400)
        throw new Error("Error in creating Ticket!")
    }

    res.status(200).json(newTicket);

});

// Update Ticket

const updateTicket = expressAsyncHandler(async(req,res) =>{

    // GET USER USING ID IN REQ.USER
    const user = await User.findById(req.user._id);

    if(!user)
    {
        res.status(401)
        throw new Error("User Not Found!")
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id , req.body ,
        {new : true});  // params ke sath simple id ayegi not underscore

    
    if(!updatedTicket)
    {
        res.status(400)
        throw new Error("Error in Updating Ticket!")
    }

    res.status(200).json(updatedTicket);
});


module.exports = {getTickets , getTicket , addTicket ,updateTicket};