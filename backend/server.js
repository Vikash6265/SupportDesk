const express = require('express');
const connectDB = require('./config/db_config');
const { errorHandler } = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB connection
connectDB();


// Body - Parsel

app.use(express.json());
app.use(express.urlencoded({extended : true}));


// Home Routes

app.get('/',(req,res)=>{
    res.json({
        msg : "WELCOME TO TICKET API"
    });
});

// User routes

app.use('/api/user',require("./routes/userRoutes"));

// Ticket routes

app.use('/api/ticket', require("./routes/ticketRoutes"));

// Admin Routes

app.use('/api/admin',require('./routes/adminRoutes'));

// Error Handler
app.use(errorHandler)

// Server

app.listen(PORT,()=>{
    console.log(`Server is running at PORT : ${PORT}`);
});