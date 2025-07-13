
const bcrypt = require("bcrypt");
const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const Student = require('../Models/Student')(sequelize, DataTypes);


exports.createStudent = async (studentData) => {
  try {
    const newStudent = await Student.create(studentData);
    return newStudent;
  } catch (error) {
    throw error;
  }
};

exports.getAllStudents = async () => {
  try {
    const students = await Student.findAll();
    return students;
  } catch (error) {
    throw error;
  }
};

exports.getStudentById = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      const error = new Error('Student not found');
      error.status = 404;
      throw error;
    }
    return student;
  } catch (error) {
    throw error;
  }
};

exports.updateStudent = async (id, updatedData) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      const error = new Error('Student not found');
      error.status = 404;
      throw error;
    }

    await student.update(updatedData);
    return student;
  } catch (error) {
    throw error;
  }
};

exports.deleteStudent = async (id) => {
  try {
    const deleted = await Student.destroy({ where: { student_id: id } });
    if (!deleted) {
      const error = new Error('Student not found or already deleted');
      error.status = 404;
      throw error;
    }
    return { message: 'Student deleted successfully' };
  } catch (error) {
    throw error;
  }
};
