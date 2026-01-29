import express from 'express';
import programController from '../Controllers/ProgramCourseController.js';
import { Sequelize, DataTypes } from 'sequelize';

const router = express.Router();

// GET /api/ - Commented as it serves no purpose
// router.get('/', (req, res) => {
//   res.status(200).send('Welcome To Program API');
// });

// GET /api/programs/listing
router.get('/', async (req, res) => {
  await programController.getAllPrograms(req, res);
});

// POST /api/programs/create (create program)
router.post('/', async (req, res) => {
  await programController.createProgram(req, res);
});

// PUT /api/programs/update (update program)
router.put('/', async (req, res) => {
  await programController.updateProgram(req, res);
});

// DELETE /api/programs/delete (delete program)
router.delete('/:id', async (req, res) => {
    await programController.deleteProgram(req, res);
});

export default router;