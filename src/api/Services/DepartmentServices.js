const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const { error } = require('console');
const { DeleteDepartment } = require('../Controllers/DepartmentController');
const DepartmentModel= require('../Models/user')(sequelize, DataTypes);

exports.getDepartmentById(id) = async(req,res)=>{
  if (!id) {
    throw new Error("Department ID is required");
  }

  const department = await DepartmentModel.findByPk(id);
  return department; // Will be null if not found
}
exports.CreateDeparment = async (departmentData) => {
  try {
    const department = await DepartmentModel.create(departmentData);

    if (!department) {
      throw new Error("Department creation failed");
    }

    return {
      message: "Department created successfully",
      department: department.toJSON()
    };
  } catch (error) {
    throw error;
  }
};
exports.UpdateDepartment = async (departmentData) => {
  try{
    const { id, ...updateData } = departmentData;

    if (id === undefined) {
      throw new Error("ID must be provided");
    }

    const [updatedRows] = await DepartmentModel.update(updateData, {
      where: { id }
    });

    if (updatedRows > 0) {
      return "Department updated successfully";
    } else {
      return "No department found with the given ID";
    }
  }catch(error){
    throw error
  }
};

exports.DeleteDepartment = async (id) => {
  try {
    if (id === undefined) {
      throw new Error("ID must be provided");
    }

    const deletedRows = await DepartmentModel.destroy({
      where: { id }
    });

    if (deletedRows > 0) {
      return "Department deleted successfully";
    } else {
      return "No department found with the given ID";
    }
  } catch (error) {
    throw error;
  }
};

