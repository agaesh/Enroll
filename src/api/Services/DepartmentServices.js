import path from 'path';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import sequelize from '../../../src/config/db.js';
import DepartmentModelFactory from '../Models/department.js';

// Required to simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize model
const DepartmentModel = DepartmentModelFactory(sequelize, DataTypes);

// 🟩 Get Department By ID
export const getDepartmentById = async (id) => {
  if (!id) {
    throw new Error('Department ID is required');
  }

  const department = await DepartmentModel.findByPk(id);
  return department; // null if not found
};

// 🟩 Create Department
export const CreateDeparment = async (departmentData) => {
  try {
    const department = await DepartmentModel.create(departmentData);

    if (!department) {
      throw new Error('Department creation failed');
    }

    return {
      message: 'Department created successfully',
      department: department.toJSON(),
    };
  } catch (error) {
    throw error;
  }
};

// 🟩 Update Department
export const UpdateDepartment = async (departmentData) => {
  try {
    const { department_id, ...updateData } = departmentData;

    if (department_id === undefined) {
      throw new Error('ID must be provided');
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error('At least one department field must be provided to update');
    }

    const findExistingDeparment = await DepartmentModel.findOne({
      where: { department_id },
    });

    if (!findExistingDeparment) {
      throw new Error('No Department found with the given department ID');
    }

    const [updatedRows] = await DepartmentModel.update(updateData, {
      where: { department_id },
    });

    if (updatedRows > 0) {
      return 'Department updated successfully';
    } else {
      throw new Error('No Department found with the given ID');
    }
  } catch (error) {
    throw error;
  }
};

// 🟩 Delete Department
export const DeleteDepartment = async (id) => {
  try {
    if (id === undefined) {
      throw new Error('ID must be provided');
    }

    const deletedRows = await DepartmentModel.destroy({
      where: { department_id: id },
    });

    if (deletedRows > 0) {
      return 'Department deleted successfully';
    } else {
      throw new Error('No department found with the given ID');
    }
  } catch (error) {
    throw error;
  }
};
