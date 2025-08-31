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
exports.UpdateInstructor = async (req,res) => {
  try {
    // Find instructor by primary key (id)
    const instructor = await Instructor.findByPk(req.param.id);

    if (!instructor) {
      const error = new Error("Instructor not found with the given id");
      error.status = 404;   // attach custom property
      throw error;
    }

    // Update instructor with new data
    await instructor.update(req.body);
    return {
      success: true,
      message: "Instructor  updated successfully",
      fields: updateFields.toJSON()
    }; 
  } catch (error) {
    throw error;
  }
};

