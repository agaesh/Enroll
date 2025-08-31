const express = require('express');
const router = express.Router();
const InstructorController = require('../Controllers/InstructorController')

// GET /api/programs
router.get('/', (req, res) => {
  res.status(200).send("Welcome To Instructor API");
});

router.get('/', async(req, res)=>{
  //  await InstructorController.getAllInstructor(req,res)
})
// POST /api/deparment (create program)
router.post('/', async (req, res) => {
  await InstructorController.CreateInstructor(req, res);
});
// PUT /api/deparment (create program)
router.put('/:id', async (req, res) => {
  await InstructorController.UpdateInstructor(req,res)
});

router.delete('/:id', async (req, res) => {
  await InstructorController.DeleteInstructor(req,res)
});
module.exports = router