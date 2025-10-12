import path from 'path';
import { fileURLToPath } from 'url';
import { DataTypes } from 'sequelize';
import sequelize from '../../Config/db.js';
import InstructorModelFactory from '../Models/instructor.js';
import ProgramCourseModelFactory from '../Models/programcourse.js';

// 🔧 Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧩 Initialize models
const Instructor = InstructorModelFactory(sequelize, DataTypes);
const ProgramCourse = ProgramCourseModelFactory(sequelize, DataTypes);

// 🟩 Create Instructor
const createInstructor = async (InstructorData) => {
  try {
    const instructor = await Instructor.create(InstructorData);

    return {
      success: true,
      message: 'Instructor created successfully',
      data: instructor.toJSON(),
    };
  } catch (error) {
    throw error;
  }
};

// 🟩 Update Instructor
const updateInstructor = async (id, InstructorData) => {
  try {
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      const error = new Error('Instructor not found with the given id');
      error.status = 404;
      throw error;
    }

    const updatedInstructor = await instructor.update(InstructorData);

    if (updatedInstructor) {
      return {
        success: true,
        message: 'Instructor updated successfully',
        data: updatedInstructor.toJSON(),
      };
    } else {
      throw new Error('Instructor update failed');
    }
  } catch (error) {
    throw error;
  }
};

// 🟩 Delete Instructor
const deleteInstructor = async (id) => {
  try {
    // Check assigned courses
    const courseCount = await ProgramCourse.count({
      where: { instructor_Id: id, type: 'course' },
    });

    if (courseCount > 0) {
      throw new Error('Cannot delete instructor: assigned to courses');
    }

    // Check assigned programs
    const programs = await Instructor.findByPk(id, { include: 'Programs' });

    if (programs?.Programs?.length > 0) {
      throw new Error('Cannot delete instructor: assigned to programs');
    }

    const deletedRows = await Instructor.destroy({ where: { instructor_Id: id } });

    if (deletedRows > 0) {
      return {
        success: true,
        message: 'Instructor deleted successfully',
      };
    } else {
      throw new Error('Instructor not found or already deleted');
    }
  } catch (error) {
    throw error;
  }
};

// ✅ Export all functions as a single default object
export default {
  createInstructor,
  updateInstructor,
  deleteInstructor
};
