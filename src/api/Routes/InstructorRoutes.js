const express = require('express');
const router = express.Router();
const InstructorController = require('../Controllers/InstructorController')
const validationId  = require('../Validators/RequiredID');
const validationBody = require('../Validators/RequiredBody')
// GET /api/programs
router.get('/home', (req, res) => {
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
router.put('/:id', [...validationId, ...validationBody], async (req, res) => {
  await InstructorController.UpdateInstructor(req,res)
});

router.delete('/:id', [...validationId, ...validationBody], async (req, res) => {
  await InstructorController.DeleteInstructor(req,res)
});
module.exports = router