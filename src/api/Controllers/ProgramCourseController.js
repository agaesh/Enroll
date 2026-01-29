import ProgramService from "../Services/ProgramCourseServices.js";
import path from "path";
import { fileURLToPath } from "url";
import { DataTypes } from "sequelize";
import sequelize from "../../../src/Config/db.js";
import defineProgramCourse from "../Models/programcourse.js";

const ProgramCourse = defineProgramCourse(sequelize, DataTypes);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ Create Program
const createProgram = async (req, res) => {
  try {
    const addProgram = await ProgramService.createProgram(req.body);
    if (addProgram) {
      res.status(201).json({
        message: 'Program Added Successfully',
        id: addProgram.id
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✅ Get All Programs
const getAllPrograms = async (req, res) => {
  try {
    let { top, page, limit, search } = req.query; // use query params for GET
    let response = await ProgramService.SearchProgram(top, page,limit, search)

    return res.status(200).json({
      code:res.statusCode,
      response
    })
     
  } catch (error) {
   res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✅ Update Program
const updateProgram = async (req, res) => {
  try {
    const { message } = await ProgramService.updateProgram(req.body);

    res.status(200).json({
      code:200,
      data: data,
      message
    });
  } catch (err) {
   res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

// ✅ Delete Program
const deleteProgram = async (req, res) => {
  try {
    const { message } = await ProgramService.deleteProgram(req.params.id);

    return res.status(200).json({
      code: 200,
      message
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      code: error.status || 500,
      error: error.message || "Internal Server Error"
    });
  }
};

// ✅ Single default export
export default {
  createProgram,
  getAllPrograms,
  updateProgram,
  deleteProgram
};
