const ProgramService = require("../Services/ProgramCourseServices")

exports.createProgram = async (req, res) => {
  try {
    const newUser = await ProgramService.createProgram(req.body);
    if(newUser){
      res.status(201).json({
          message: 'User registered successfully!',
          userId: newUser.id
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};