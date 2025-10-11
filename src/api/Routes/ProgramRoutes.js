import express from 'express';
import programController from '../Controllers/ProgramCourseController.js';
import { Sequelize, DataTypes } from 'sequelize';

const router = express.Router();

// GET /api/programs
router.get('/', (req, res) => {
  res.status(200).send('Welcome To Program API');
});

// GET /api/programs/listing
router.get('/listing', async (req, res) => {
  await programController.getAllPrograms(req, res);
});

// POST /api/programs/create (create program)
router.post('/create', async (req, res) => {
  await programController.createProgram(req, res);
});

// PUT /api/programs/update (update program)
router.put('/update', async (req, res) => {
  await programController.UpdateProgram(req, res);
});

// DELETE /api/programs/delete (delete program)
router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.body; // ✅ from body
    const result = await programController.DeleteProgram(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

export default router;