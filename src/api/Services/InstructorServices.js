const path = require('path');
const { Instructor, ProgramCourse } = require(path.join(global.__srcdir, 'api', 'Models'));

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
        data: update.toJSON()
      }; 
    }
  } catch (error) {
    throw error;
  }
};

exports.DeleteInstructor = async(id)=>{
    try{

        // Check courses
        const courseCount = await ProgramCourse.count({ where: { instructor_Id: id, type: 'course'} });

        if (courseCount > 0) {
            throw new Error("Cannot delete instructor: assigned to courses");
        }

        // Check programs
        // const programs = await Instructor.findByPk(id, { include: Program });

        // if (programs.Programs && programs.Programs.length > 0) {
        //     throw new Error("Cannot delete instructor: assigned to programs");
        // }

        const deleteInstructor = await Instructor.destroy({where: {id: id}})

        return{
            success:true,
            message: "Instructor Deleted Successfully"
        }
    }catch(error){
        throw error;
    }
}
