'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Departments', {
      department_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      department_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      department_code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      head_id: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(150),
        allowNull: true
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      building: {
        type: Sequelize.STRING(100),
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Departments');
  }
};
