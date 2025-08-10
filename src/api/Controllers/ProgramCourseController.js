const ProgramService = require("../Services/ProgramCourseServices")
const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const ProgramCourse = require('../Models/programcourse')(sequelize, DataTypes)

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

exports.DeleteProgram = async(id)=>{
   return await ProgramService.DeleteProgram(id)
}