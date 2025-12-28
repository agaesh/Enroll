import DepartmentService from '../Services/DepartmentServices.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import sequelize from '../../../src/Config/db.js';
import defineDepartmentModel from '../Models/department.js';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize model
const DepartmentModel = defineDepartmentModel(sequelize, DataTypes);

// ✅ Get All Departments
const getAllDepartments = async (req, res) => {
  try {
    let { top, page, limit } = req.body;

    top = parseInt(top);
    page = parseInt(page);
    limit = parseInt(limit);

    const queryOptions = {
      order: [['createdAt', 'DESC']],
    };

    if (top) {
      queryOptions.limit = top;
    } else if (page && limit) {
      const offset = (page - 1) * limit;
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    const departments = await DepartmentModel.findAll(queryOptions);

    res.status(200).json({
      status: 'success',
      data: departments,
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✅ Get Department by ID
const getDepartmentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentService.getDepartmentById(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(400).json({ message: error.message });
  }
};

// ✅ Create Department
const createDepartment = async (req, res) => {
  try {
    const addDepartment = await DepartmentService.CreateDeparment(req.body);
    if (addDepartment) {
      res.status(201).json({
        message: addDepartment.message,
        data: addDepartment.department
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✅ Update Department
const updateDepartment = async (req, res) => {
  try {
    const update = await DepartmentService.UpdateDepartment(req.body);
    res.status(201).json({ message: update });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Department
const deleteDepartment = async (req, res) => {
  try {
    const result = await DepartmentService.DeleteDepartment(req.body.id);
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Single default export
export default {
  getAllDepartments,
  getDepartmentByID,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
