'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProgramCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ProgramCourse.belongsTo(models.ProgramCourse, {
      as: 'parent',
      foreignKey: 'parent_id'
      });

      ProgramCourse.hasMany(models.ProgramCourse, {
      as: 'children',
      foreignKey: 'parent_id'
      });

      // Department association
      ProgramCourse.belongsTo(models.Department, {
        foreignKey: 'department_id',
        as: 'department'
      });
    }
  }
  ProgramCourse.init({
    parent_id: DataTypes.INTEGER,
    type: {
      type:DataTypes.ENUM('PROGRAM','COURSE'),
      allowNull:false,
      defaultValue:null,
    },
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    department_id: DataTypes.INTEGER,
    credit_hours: DataTypes.INTEGER,
    semester: DataTypes.INTEGER,
    level: {
      type: DataTypes.ENUM('DIPLOMA','DEGREE','MASTER','DOCTORATE'),
      allowNull:false
    },
    is_active: DataTypes.BOOLEAN,
    mode: {
    type: DataTypes.ENUM('FULLTIME', 'PARTTIME', 'ONLINE', 'HYBRID', 'DISTANCE'),
    allowNull: false, // or false if it's required
    defaultValue:''
}
  }, {
    sequelize,
    modelName: 'ProgramCourse',
    timestamps: true
  });
  return ProgramCourse;
};