const express = require('express');
const { getAllTickets } = require('../controllers/adminController');
const isAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/tickets').get(isAdmin,getAllTickets);

module.exports = router;