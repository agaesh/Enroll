const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db.js'); // your actual DB connection

// Import all models here
const User = require('../Models/user')(sequelize, DataTypes);
const Program = require('../Models/Program')(sequelize, DataTypes);
const Department = require('../Models/Department')(sequelize, DataTypes);
const Instructor = require('../Models/Instructor')(sequelize, DataTypes);
const ProgramCourse = require('../Models/ProgramCourse')(sequelize, DataTypes);
const Student = require('../Models/Student')(sequelize, DataTypes);

// Export everything
module.exports = {
  sequelize,
  User,
  Program,
  Department,
  Instructor,
  ProgramCourse,
  Student,
  DataTypes,
};