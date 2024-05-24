const mongoose = require('mongoose');

const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connection Success : ${conn.connection.host}, project-name : ${conn.connection.name}`);
    } catch (error) {
        console.log(`DB connection Failed : ${error.message}`);
    }
}

module.exports = connectDB;