import express from 'express';
import InstructorController from '../Controllers/InstructorController.js';
import validationId from '../Validators/RequiredID.js';
import validationBody from '../Validators/RequiredBody.js';

const router = express.Router();

// GET /api/instructor/home
router.get('/home', (req, res) => {
  res.status(200).send('Welcome To Instructor API');
});

// GET /api/instructor
router.get('/', async (req, res) => {
  // await InstructorController.getAllInstructor(req, res);
});

// POST /api/instructor (create instructor)
router.post('/', async (req, res) => {
  await InstructorController.CreateInstructor(req, res);
});

// PUT /api/instructor/:id (update instructor)
router.put('/:id', [...validationId, ...validationBody], async (req, res) => {
  await InstructorController.UpdateInstructor(req, res);
});

// DELETE /api/instructor/:id (delete instructor)
router.delete('/:id', [...validationId, ...validationBody], async (req, res) => {
  await InstructorController.DeleteInstructor(req, res);
});

export default router;
