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

    const update = await ProgramCourse.update(updateFields, {
      where: { id },
    });

    return {message: 'Program updated successfully'};
  } catch (error) {
    throw error;
  }
};

const SearchProgram = async (top,page,limit,search) => {
    try {
    
      const queryOptions = {
        where: { type: "PROGRAM" },
        // order: [["createdAt", "DESC"]],
      };

      // Pagination
      if (top) {
        queryOptions.limit = parseInt(top, 10);
      } else if (page && limit) {
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);
        queryOptions.limit = limit;
        queryOptions.offset = (page - 1) * limit; // ✅ fixed parseDecimal
      }

      // Wildcard search
      if (search) {
        queryOptions.where = {
          ...queryOptions.where,
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { code: { [Op.like]: `%${search}%` } }
            // add more fields if needed
          ]
        };
      }

      const programs = await ProgramCourse.findAll(queryOptions);

     return {
      programs,
      pagination: {
      page: page || null,
      limit: queryOptions.limit || null,
      total: programs.length
    }
};
    } catch (error) {
      throw error;
    }
  }


// ✅ Single default export
export default {
  createProgram,
  updateProgram,
  deleteProgram,
  SearchProgram
};
