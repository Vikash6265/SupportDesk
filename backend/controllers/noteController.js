const expressAsyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Note = require("../model/noteModel");


const getNote = expressAsyncHandler(async(req,res) =>{

    const user = await User.findById(req.user._id);

    if(!user)
    {
        res.status(401);
        throw new Error("User Not Found");
    }

    const notes = await Note.find({ticket : req.params._id});
    
    if(!notes)
    {
        res.status(404);
        throw new Error("Notes Not Found");
    }

    res.status(200).json(notes);

});

const addNote = expressAsyncHandler(async(req,res) =>{

    const {description} = req.body;

    if(!description)
    {
        res.status(401);
        throw new Error("Please Describe Your Note!");
    }

    // 1. Get User From JWT token

    const user = await User.findById(req.user._id);

    if(!user)
    {
        res.status(401);
        throw new Error("User Not Found");
    }

    // store 

    const note = await Note.create({
        user : req.user._id,
        ticket : req.params.ticketId,
        description : description,
    });

    res.status(201).json(note);  // json wala object me nhi lena he mtlb not curly bracket ese udhar bhi nested object bnega

});

module.exports = {getNote , addNote};