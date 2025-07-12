'use strict';
const {
  Model,
  ENUM,
  DATE
} = require('sequelize');
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
    username:{
      allowNull:false,
      unique:true,
      type:DataTypes.STRING
    },
    email:{
      allowNull:false,
      unique:true,
      type:DataTypes.STRING
    },
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM("STUDENT", "ADMIN", "INSTRUCTOR"),
      allowNull: false,
      defaultValue: "STUDENT"
    },
    is_active: DataTypes.BOOLEAN,
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true, // or false if you want it required
    },
    
    
  }, {
    sequelize,
    modelName: 'User',
     timestamps: true, 
  });
  return User;
};