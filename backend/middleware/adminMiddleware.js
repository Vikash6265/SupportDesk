const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const User = require("../model/userModel");

const isAdmin = asyncHandler(async(req,res,next) =>{

    let token;  // bahar esliye kyuki esme scope nhi hota to bahar hi declared kr diya

                            // authou. check krne pr token start Bearer se hona chahiye
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        
        try {
            
        // Get Token From Header

            token = req.headers.authorization.split(" ")[1]

             // 1. string ko todne ke liye split() method ka use krte he or hm space se thodenge
             // 2. fir console pr hme array ke form mr bearer or token no milenge
             // 3. bearer ki index = 0 , or token ki = 1 to hme token chiye tha to split(" ")[1]
            
        // VERIFY TOKEN   
            
            const decoded = jwt.verify(token , process.env.JWT_SECRET);

            // 1. verify() - se hme decoded object return krega esme
            // 2. jwt jsonweb token pr jo [id,startdate,enddate] tha ewo pura show kr dega
            // 3. id milne pr query chala denge jisse user ki id token se match krwa denge
            

        // GET USER FROM TOKEN
            
             req.user = await User.findById(decoded.id).select("-password") 
            
            // req.user ki jgh hmne variable bnaya tha 'const user' hmne fir direct req me store krwa diya user ko
            // 1. id mil jaygi to us id ke user ko console kra dega 
            // 2. .select() method se hm "-" or jo bhi data hme show ya chipana ho use unshow kr skte he

            // console.log(req.user);
            if(!req.user)   // same !user but I'm use direct req store user
            {
                res.status(401)
                throw new Error("Admin Access Only!");
            }

           if(req.user.isAdmin)
           {
            next();
           }
           else{
            res.status(401);
            throw new Error("Admin Access Only!")
           }

        } catch (error) {
            console.log(error.message);
            res.status(400)
            throw new Error("Admin Access Only!");
        }
    }
    else{
        res.status(400)
        throw new Error("Admin Access Only!")
    }

    if(!token){
        res.status(401)
        throw new Error("Admin Access Only!");
    }

});

module.exports = isAdmin;