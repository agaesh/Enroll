const path = require('path');
const ProgramService = require(path.join(global.__srcdir, 'api', 'Services', 'ProgramCourseServices'));
const { ProgramCourse } = require(path.join(global.__srcdir, 'api', 'Models'));

exports.createProgram = async (req, res) => {
  try {
    const addProgram = await ProgramService.createProgram(req.body);
    if(addProgram){
      res.status(201).json({
          message: 'Program Added Successfully',
          userId: addProgram.id
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

exports.getAllPrograms = async (req, res) => {
  try {
    let { top, page, limit } = req.body;

    // Convert string query params to numbers
    top = parseInt(top);
    page = parseInt(page);
    limit = parseInt(limit);

    let queryOptions = {
      order: [['createdAt', 'DESC']] // latest first
    };

    if (top) {
      // Return only top X records
      queryOptions.limit = top;
    } 
    else if (page && limit) {
      // Apply pagination
      const offset = (page - 1) * limit;
      queryOptions.limit = limit;
      queryOptions.offset = offset;
    }

    const programs = await ProgramCourse.findAll(queryOptions);

    res.status(200).json({
      status: 'success',
      data: programs
    });

  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
};
exports.UpdateProgram = async (req, res) => {
  try {
    const result = await ProgramService.UpdateProgram(req.body);

  if (result.success) {
    res.status(200).json({
      success: true,
      message: result.message || "Operation successful",
      data: result.data || null
    });
  } else {
    res.status(result.statusCode || 400).json({
      success: false,
      message: result.message || "Operation failed",
      error: result.error || null
    });
  }
  
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message
    });
  }  
};
exports.DeleteProgram = async(id)=>{
   return await ProgramService.DeleteProgram(id)
}  