'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProgramCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parent_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('PROGRAM','COURSE'),
        allowNull:false
      },
      code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      department_id: {
        type: Sequelize.INTEGER
      },
      credit_hours: {
        type: Sequelize.INTEGER
      },
      semester: {
        type: Sequelize.INTEGER
      },
      level: {
        type: Sequelize.ENUM('DIPLOMA','DEGREE','MASTER','DOCTORATE'),
        allowNull:false
      },
      is_active: {
        type: Sequelize.BOOLEAN
      },
      mode: {
      type: Sequelize.ENUM('FULLTIME', 'PARTTIME', 'ONLINE', 'HYBRID', 'DISTANCE'),
      allowNull: false
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProgramCourses');
  }
};