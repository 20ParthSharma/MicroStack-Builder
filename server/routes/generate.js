const express = require('express');
const { generateProject } = require('../controllers/generateController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, generateProject);

module.exports = router;
