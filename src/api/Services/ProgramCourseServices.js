import path from 'path';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import sequelize from '../../Config/db.js';
import ProgramCourseModelFactory from '../Models/programcourse.js';

// 🔧 Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧩 Initialize model
const ProgramCourse = ProgramCourseModelFactory(sequelize, DataTypes);

// 🟩 Create Program
const createProgram = async (programData) => {
  try {
    const existingProgram = await ProgramCourse.findOne({
      where: { code: programData.code },
    });

    if (existingProgram) {
      const error = new Error('Program code already exists');
      error.status = 400;
      throw error;
    }

    const newProgram = await ProgramCourse.create({
      parent_id: null,
      type: 'PROGRAM',
      code: programData.code,
      name: programData.name,
      department_id: programData.department_id,
      credit_hours: programData.credit_hours || null,
      semester: programData.semester || null,
      level: programData.level,
      is_active: programData.is_active ?? true,
      mode: programData.mode || 'FULLTIME',
    });

    return newProgram;
  } catch (error) {
    throw error;
  }
};

// 🟩 Delete Program
const deleteProgram = async (id) => {
  try {
    const findProgram = await ProgramCourse.findOne({ where: { id } });

    if (!findProgram) {
      const error = new Error('Program cannot be found');
      error.status = 404;
      throw error;
    }

    await findProgram.destroy();
    return { message: 'Program deleted successfully' };
  } catch (error) {
    throw error;
  }
};

// 🟩 Update Program
const updateProgram = async (programData) => {
  try {
    const { id, ...updateFields } = programData;

    if (!id) {
      throw new Error('Program ID is required to update');
    }

    const [rowsUpdated] = await ProgramCourse.update(updateFields, {
      where: { id },
    });

    if (rowsUpdated === 0) {
      return { success: false, message: 'No program found with the given ID' };
    }

    return { success: true, message: 'Program updated successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// ✅ Single default export
export default {
  createProgram,
  updateProgram,
  deleteProgram
};
