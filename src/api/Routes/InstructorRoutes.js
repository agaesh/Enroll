const express = require('express');
const router = express.Router();
const path =  require('node:path');
const InstructorController = require(path.join(global.__srcdir, 'api', 'Controllers', 'InstructorController.js'))
const validationId  = require(path.join(global.__srcdir, 'api', 'Validators', 'RequiredID.js'))
const validationBody = require(path.join(global.__srcdir, 'api', 'Validators', 'RequiredBody.js'))
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