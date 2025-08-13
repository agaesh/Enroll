const DepartmentService = require('../Services/DepartmentService');

exports.createDeparment = async (req, res) => {
  try {
    const addDeparment = await DepartmentService.create(req.body);
    if(addDeparment){
      res.status(201).json({
          message: addDeparment.message,
          data: addDeparment.data
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};