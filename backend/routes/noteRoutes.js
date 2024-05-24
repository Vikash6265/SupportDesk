const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getNote, addNote } = require('../controllers/noteController');

const router = express.Router({ mergeParams : true });

router.route('/').get(protect , getNote).post(protect , addNote);

module.exports = router;