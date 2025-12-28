import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Student extends Model {
    static associate(models) {
      // Define association
      Student.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    }
  }

  Student.init(
    {
      user_id: DataTypes.INTEGER,
      student_number: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      gender: DataTypes.STRING,
      enrollment_year: DataTypes.INTEGER,
      department_id: DataTypes.INTEGER,
      is_active: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Student',
    }
  );

  return Student;
};
