const express = require('express');
const { getTickets, getTicket, addTicket, updateTicket } = require('../controllers/ticketController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route("/").get(protect , getTickets).post(protect , addTicket);

router.route("/:id").get(protect , getTicket).put(protect , updateTicket);


// Re Routing Towards /api/ticket/:ticketId/note

router.use("/:ticketId/note",require("./noteRoutes"));


module.exports = router;