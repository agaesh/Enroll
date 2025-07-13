'use strict';
const { Model, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
      /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
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
      type: DataTypes.ENUM("STUDENT", "ADMIN", "INSTRUCTOR"),
      allowNull: false,
      defaultValue: "STUDENT"
    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
  });

  return User;
};
