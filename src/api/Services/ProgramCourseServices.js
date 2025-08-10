const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const ProgramCourse = require('../Models/programcourse')(sequelize, DataTypes)
exports.createProgram = async (programData) => {
  try {
    // Check if program with same code already exists
    const existingProgram = await ProgramCourse.findOne({
      where: { code: programData.code }
    });

    if (existingProgram) {
      const error = new Error('Program code already exists');
      error.status = 400;
      throw error;
    } 

    // Create new program
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
      mode: programData.mode || 'FULLTIME'
    });

    return newProgram;
  } catch (error) {
    throw error;
  }
};

exports.DeleteProgram = async (id) => {
    const findProgram = await ProgramCourse.findOne({ where: { id } });

    if (!findProgram) {
        const error = new Error("Course cannot be found");
        error.status = 404;
        throw error;
    }

    await findProgram.destroy();

    return { message: "Program deleted successfully" };
};

