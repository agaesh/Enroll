import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Define associations here (if needed)
    }
  }

  User.init(
    {
      username: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM('STUDENT', 'ADMIN', 'INSTRUCTOR'),
        allowNull: false,
        defaultValue: 'STUDENT',
      },
      is_active: {
        type: DataTypes.BOOLEAN,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
    }
  );

  return User;
};
