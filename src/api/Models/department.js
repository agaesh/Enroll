import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Department extends Model {
    static associate(models) {
      // One department optionally has one department head (an instructor)
      Department.belongsTo(models.Instructor, {
        foreignKey: 'head_id',
        as: 'head', // Allows department.getHead()
      });
    }
  }

  Department.init(
    {
      department_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      department_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      head_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      building: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Department',
      tableName: 'Departments',
      timestamps: false,
    }
  );

  return Department;
};
