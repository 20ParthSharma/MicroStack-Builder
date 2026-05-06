const express = require('express');
const { getProjects, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getProjects);

router.route('/:id')
  .delete(protect, deleteProject);

module.exports = router;
