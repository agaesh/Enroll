import ProgramService from "../Services/ProgramCourseServices.js";
import path from "path";
import { fileURLToPath } from "url";
import { DataTypes } from "sequelize";
import sequelize from "../../../src/config/db.js";
import defineProgramCourse from "../Models/programcourse.js";

const ProgramCourse = defineProgramCourse(sequelize, DataTypes);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ Create Program
export const createProgram = async (req, res) => {
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

// ✅ Get All Programs
export const getAllPrograms = async (req, res) => {
  try {
    let { top, page, limit } = req.body;

    // Convert string query params to numbers
    top = parseInt(top);
    page = parseInt(page);
    limit = parseInt(limit);

    const queryOptions = {
      order: [["createdAt", "DESC"]],
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
      status: "success",
      data: programs,
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// ✅ Update Program
export const UpdateProgram = async (req, res) => {
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