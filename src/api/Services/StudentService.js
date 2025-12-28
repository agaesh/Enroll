import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import { DataTypes } from "sequelize";
import sequelize from "../../Config/db.js";
import StudentModel from "../Models/Student.js";
import User from "../Models/user.js";

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Student = StudentModel(sequelize, DataTypes);

// 🟩 Create Student
const createStudent = async (studentData) => {
  try {
    const newStudent = await Student.create(studentData);
    return newStudent;
  } catch (error) {
    throw error;
  }
};

// 🟩 Get All Students
const getAllStudents = async () => {
  try {
    const students = await Student.findAll();
    return students;
  } catch (error) {
    throw error;
  }
};

// 🟩 Get Student By ID
const getStudentById = async (id) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      const error = new Error("Student not found");
      error.status = 404;
      throw error;
    }
    return student;
  } catch (error) {
    throw error;
  }
};

// 🟩 Update Student
const updateStudent = async (id, updatedData) => {
  try {
    const student = await Student.findByPk(id);
    if (!student) {
      const error = new Error("Student not found");
      error.status = 404;
      throw error;
    }

    await student.update(updatedData);
    return student;
  } catch (error) {
    throw error;
  }
};

// 🟩 Delete Student
const deleteStudent = async (id) => {
  try {
    const deleted = await Student.destroy({ where: { student_id: id } });
    if (!deleted) {
      const error = new Error("Student not found or already deleted");
      error.status = 404;
      throw error;
    }
    return { message: "Student deleted successfully" };
  } catch (error) {
    throw error;
  }
};

// 🟩 Change Password
const changePassword = async (email, password, confirmpass) => {
  try {
    if (password !== confirmpass) {
      throw new Error("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [updatedRows] = await User.update(
      { password: hashedPassword },
      { where: { email } }
    );

    if (updatedRows === 0) {
      throw new Error("User not found or password not updated");
    }

    return { message: "Password updated successfully" };
  } catch (error) {
    throw error;
  }
};

// ✅ Single default export
export default {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  changePassword
};
