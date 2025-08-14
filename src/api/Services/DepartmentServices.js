const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const { error } = require('console');
const DepartmentModel= require('../Models/user')(sequelize, DataTypes);

exports.Create = async (departmentData) => {
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
