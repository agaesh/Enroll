import DepartmentService from '../Services/DepartmentServices.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import { UpdateProgram } from './ProgramCourseController.js';
import sequelize from '../../../src/config/db.js';
import defineDepartmentModel from '../Models/department.js';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize model
const DepartmentModel = defineDepartmentModel(sequelize, DataTypes);

// ✅ Get All Departments
export const getAllDepartments = async (req, res) => {
  try {
    let { top, page, limit } = req.body;

    // Convert string query params to numbers
    top = parseInt(top);
    page = parseInt(page);
    limit = parseInt(limit);

    const queryOptions = {
      order: [['createdAt', 'DESC']], // latest first
    };

    if (top) {
      // Return only top X records
      queryOptions.limit = top;
    } else if (page && limit) {
      queryOptions.limit = limit;
      queryOptions.offset = (page - 1) * limit;
    }

    const departments = await DepartmentModel.findAll(queryOptions);

    res.status(200).json({
      status: 'success',
      data: departments, // No need for toJson()
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || 'Internal Server Error' });
  }
};
// ✅ Get Department by ID
export const getDepartmentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentService.getDepartmentByID(id);

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
export const createDepartment = async (req, res) => {
  try {
    const addDepartment = await DepartmentService.CreateDeparment(req.body);
    if (addDepartment) {
      res.status(201).json({
          message: addDeparment.message,
          data: addDeparment.data
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✅ Update Department
export const updateDepartment = async (req, res) => {
  try {
    const update = await DepartmentService.UpdateDepartment(req, res);
    res.status(201).json({ message: update.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Department
export const deleteDepartment = async (req, res) => {
  try {
    await DepartmentService.DeleteDepartment(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
