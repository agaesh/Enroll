const DepartmentService = require('../Services/DepartmentServices');
const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const { UpdateProgram } = require('./ProgramCourseController');
const { error } = require('console');
const DepartmentModel = require('../Models/department')(sequelize, DataTypes)

exports.getAllDeparments = async(req, res)=>{
    try{

     let {top, page, limit} = req.body

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

    DepartmentModel.findAll(queryOptions)
    .then((departments) => {
        res.status(200).json({
        status: 'success',
        data: departments.toJson()
        });
    })
    .catch((error) => {
        res.status(500).json({
        status: 'error',
        message: error.message
        });
    });

    }catch(error){
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
}


exports.getDepartmentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await DepartmentService.getDepartmentByID(id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.createDeparment = async (req, res) => {
  try {
    const addDeparment = await DepartmentService.CreateDeparment(req.body);
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

exports.UpdateDepartment = async (req, res) => {
  try {
    const update = await DepartmentService.UpdateDepartment(req, res);
    res.status(201).json({ message: update.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.DeleteDepartment = async(req, res)=>{
  try{
    const deleteDepartment = await DepartmentService.DeleteDepartment(req,res)
  }catch(error){
    res.status(500).json({ message: error.message });
  }
}

