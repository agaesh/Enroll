const path = require('path');
const base = path.resolve(__dirname, '../../../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const { error } = require('console');
const { DeleteDepartment } = require('../Controllers/DepartmentController');
const DepartmentModel= require('../Models/department')(sequelize, DataTypes);

exports.getDepartmentById = async (id) => {
  if (!id) {
    throw new Error("Department ID is required");
  }

  const department = await DepartmentModel.findByPk(id);
  return department; // null if not found
};
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
    const { department_id, ...updateData } = departmentData;

    if (department_id === undefined) {
      throw new Error("ID must be provided");
    }

    if (Object.keys(updateData).length === 0) {
       throw new Error("At-Least One Department fields must be provided to update");
    }

    const findExistingDeparment = await DepartmentModel.findOne({
      where: { department_id}
    });

    if(!findExistingDeparment){
       throw new Error("No Deparment found with the given department id")
    }

    const [updatedRows] = await DepartmentModel.update(updateData, {
      where: {department_id}
    });

    if (updatedRows > 0) {
      return "Department updated successfully";
    } else {
      throw new Error("No Department found with the given ID")
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
     where: { department_id: id }
    });

    if (deletedRows > 0) {
      return "Department deleted successfully";
    } else {
      throw new Error("No department found with the given ID")
    }
  } catch (error) {
    throw error;
  }
};

