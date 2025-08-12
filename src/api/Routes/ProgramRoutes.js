const express = require('express');
const router = express.Router();
const programController = require('../Controllers/ProgramCourseController')
const { Sequelize, DataTypes } = require('sequelize');

// GET /api/programs
router.get('/', (req, res) => {
  res.status(200).send("Welcome To Program API");
});

router.get("/listing", async(req,res)=>{
    await programController.getAllPrograms(req,res);
})
// POST /api/programs (create program)
router.post('/create', async (req, res) => {
  await programController.createProgram(req, res);
});

router.put('/update', async (req, res) => {
  await programController.UpdateProgram(req,res)
});

// DELETE /delete/:id
router.delete("/delete", async (req, res) => {
    try {
        const {id} = req.body; // ✅ from body
        const result = await programController.DeleteProgram(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message });
    }
});


module.exports = router