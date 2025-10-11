import express from 'express';
import DepartmentController from '../Controllers/DepartmentController.js';
import { Sequelize, DataTypes } from 'sequelize';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Welcome To Department API');
});

router.get('/listing', async (req, res) => {
  await DepartmentController.getAllDeparments(req, res);
});

// POST /api/department (create department)
router.post('/', async (req, res) => {
  await DepartmentController.createDeparment(req, res);
});

// PUT /api/department (update department)
router.put('/', async (req, res) => {
  await DepartmentController.UpdateDepartment(req, res);
});

export default router;
