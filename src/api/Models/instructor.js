import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Instructor extends Model {
    static associate(models) {
      // Define association here
      Instructor.belongsTo(models.Department, {
        foreignKey: 'department_id',
        as: 'department',
      });
    }
  }

  Instructor.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      hire_date: DataTypes.DATE,
      department: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Instructor',
      timestamps: true,
    }
  );

  return Instructor;
};
