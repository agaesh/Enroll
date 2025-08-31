'use strict';
const {
  Model
} = require('sequelize');
const department = require('./department');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instructor.belongsTo(models.Department, {
      foreignKey: 'department_id',
      as: 'department'
      });
    }
  }
  Instructor.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    hire_date: DataTypes.DATE,
    department_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Instructor',
    timestamps: true
  });
  return Instructor;
};