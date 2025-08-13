const express = require('express');
const router = express.Router();
const DeparmentController = require('../Controllers/DepartmentController')
const { Sequelize, DataTypes } = require('sequelize');

router.get('/', (req, res)=>{
    res.status(200).send("Welcome To Deparment API");
})

router.get('/listing', async(req, res)=>{
   await DeparmentController.getAllDeparments(req,res)
})
