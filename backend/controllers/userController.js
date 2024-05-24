const asyncHandler = require('express-async-handler');
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register User

const registerUser = asyncHandler(async(req,res) =>{

    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(401);
        throw new Error("Please Fill All Details");
    }

    // check if user already exist

    const userExist = await User.findOne({email : email});  // key value pair same hote he to
                                                        // ek br pass kr skte he pr samjae ke liye

    if(userExist)
    {
        res.status(400);
        throw new Error("User already exists!");
    }

    // Hash Password  = ese hm pass to simple dalenge but wo storage me atramsatram lega fir id se match krega

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt);

    const user = await User.create({
        name,
        email,
        password : hashedPassword,
    })

    if(!user){
        res.status(400);
        throw new Error("User Cannot Be Registered!")
    }

    res.status(201).json({   // user ko direct pocha skte the pr usme bhot sari chije ati he
                    
        // hme sirf specific cheje dene he to hm create krenge ki yahi chiye
        id : user._id,
        name : user.name,
        email : user.email,
        token : generateToken(user._id),
    });

})

// login user

const loginUser = asyncHandler(async(req,res) =>{
    
    const {email , password} = req.body;

    if(!email || !password){
        res.status(401);
        throw new Error("Please Fill All Details");
    }

    // Find If User Exist with Given Email

    const user = await User.findOne({email : email})

    // if(!user){
    //     res.status(404);
    //     throw new Error("Invalid Credential!")
    // }

    // 2 bar alag nhi lukni pde esliye if - true or else - false ke liye ek hi me kr diya

    if( user && ( await bcrypt.compare(password, user.password)))  // await lgega
    {
        res.status(201).json({
            id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
        })
    }
    else{
        res.status(404);
        throw new Error("Invalid Credential!")
    }

});

// Protected -> check karne ke liye example routes
// -> exam - he jese without protect/token ke bhi send ho rha ho to use handle krna he 
                    // uske liye authMiddleware bnani pdegi
const protectedFunction = asyncHandler(async(req,res) =>{
    res.send("I am protected");
})

// Generate Token through id

// 1. har bar login/register krne pr new token generate hoga

const generateToken = (id) =>{
    return jwt.sign({id} , process.env.JWT_SECRET , {  // id, token - secret bnaya env me, limit diya
        expiresIn : "30d",
    });
};

module.exports = {registerUser,loginUser,protectedFunction};