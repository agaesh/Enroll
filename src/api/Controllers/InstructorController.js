import InstructorService from "../Services/InstructorServices.js";
import path from "path";
import { fileURLToPath } from "url";
import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";
import UserModelDefiner from "../Models/user.js";
import InstructorModelDefiner from "../Models/instructor.js";
import { verifyWebToken } from "../../Middlewares/authMiddleware.js";

// Resolve __dirname (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const base = path.resolve(__dirname, "../../../");

const User = UserModelDefiner(sequelize, DataTypes);
const Instructor = InstructorModelDefiner(sequelize, DataTypes);

// ✅ Create Instructor
export const CreateInstructor = async (req, res) => {
  try {

    const {id, ...data} = req.body

    const findInstructor = await Instructor.findOne({ where: { user_id: id } });

    if (findInstructor) {
      return res.status(400).json({ 
          message: "This user already has an instructor profile" 
      });
    }
    // Create Instructor
    const instructor = await InstructorService.CreateInstructor(req.body);

    return res.status(201).json({
      success: true,
      message: instructor.message,
      data: instructor.instructor
    });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error creating instructor", 
      error: error.message 
    });
  }
};
exports.UpdateInstructor = async(req, res)=>{
    try{
         const update =  await InstructorService.UpdateInstructor(req.param.id, req.body);
         
         return res.status(201).JSON({
           success: true,
           message: update.message
         })
    }catch(error ){
      throw error;
    }
}
exports.DeleteInstructor = async (req, res) => {
  try {   
      const DeleteInstructor = await InstructorService.DeleteInstructor(req.params.id);
      return res.status(200).json({
        success:true,
        message: "Instructor deleted successfully" 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: "Error deleting instructor", 
        error: error.message 
      });
    }
};   
