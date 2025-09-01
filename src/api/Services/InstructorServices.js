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
exports.UpdateInstructor = async (id,InstructorData) => {
  try {
    // Find instructor by primary key (id)
    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      const error = new Error("Instructor not found with the given id");
      error.status = 404;   // attach custom property
      throw error;
    }

    // Update instructor with new data
   const update =   await instructor.update(InstructorData);
  
   if(update != undefined){
    return {
        success: true,
        message: "Instructor  updated successfully",
        data: updateFields.toJSON()
      }; 
    }
  } catch (error) {
    throw error;
  }
};

exports.DeleteInstructor = async(InstructorData)=>{
    try{

        // Check courses
        const courseCount = await ProgramCourse.count({ where: { instructor_Id: id, type: 'course'} });

        if (courseCount > 0) {
            throw new Error("Cannot delete instructor: assigned to courses");
        }

        // Check programs
        const programs = await Instructor.findByPk(id, { include: Program });

        if (programs.Programs && programs.Programs.length > 0) {
            throw new Error("Cannot delete instructor: assigned to programs");
        }

        const deleteInstructor = await Instructor.destroy(InstructorData)

        return{
            success:true,
            message: "Instructor Deleted Successfully"
        }
    }catch(error){
        throw error;
    }
}
