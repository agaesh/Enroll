const { ProgramCourse } = require("../models"); // ✅ Import from models index

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
