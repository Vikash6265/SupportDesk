const errorHandler = (err,req,res,next) =>{

    // statusCode me jese bhut br error hone pr bhi 200 ya 201 code show krta he
    // to hm usko errorhandling se manage kr skte he
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message : err.message,
        // stack : err.stack   == ye error ka sb kuch batata he ki kaha pr he error
                                // agar hme usko band krna he location error ki to niche wale
                                // jesa esme hm condition rakh denge ki 'production' se related he
        // he to null mtlb location nhi btayaga or 'development' me he to err.stack 
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })

}

module.exports = {errorHandler};