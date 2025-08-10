const express = require('express');
const router = express.Router();
const programController = require('../Controllers/ProgramCourseController');

// GET /api/programs
router.get('/', (req, res) => {
  res.status(200).send("Welcome To Program API");
});

// POST /api/programs (create program)
router.post('/', async (req, res) => {
  await programController.createProgram(req, res);
});

