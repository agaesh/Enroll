const express = require('express');
const router = express.Router();
const path = require('path')
const DeparmentController = require(path.join(__srcdir, 'api', 'Controllers', 'DepartmentController.js'))
// const { Sequelize, DataTypes } = require('sequelize');

router.get('/', (req, res)=>{
    res.status(200).send("Welcome To Deparment API");
})

router.get('/listing', async(req, res)=>{
   await DeparmentController.getAllDeparments(req,res)
})
// POST /api/deparment (create program)
router.post('/', async (req, res) => {
  await DeparmentController.createDeparment(req, res);
});
// PUT /api/deparment (create program)
router.put('/', async (req, res) => {
  await DeparmentController.UpdateDepartment(req,res)
});
module.exports = router