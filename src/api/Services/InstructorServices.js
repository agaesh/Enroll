const { error } = require('console');
const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const Instructor = require('../Models/instructor')(sequelize, DataTypes)
const ProgramCourse = require("../Models/programcourse")(sequelize, DataTypes)


exports.CreateInstructor= async(InstructorData)=>{
  try{
    const instructor = await Instructor.create(InstructorData);
    
    return {
      success: true,
      message: "Instructor created successfully",
      data: instructor.toJSON()
    };
  }catch(error){
    throw error;
  }
}
