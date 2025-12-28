'use strict';
/** @type {import('sequelize-cli').Migration} */
export default{
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
    // 🔹 Add composite unique constraint
    await queryInterface.addConstraint('ProgramCourses', {
      fields: ['parent_id', 'code', 'level'],
      type: 'unique',
      name: 'unique_parent_code_level' // custom constraint name
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('ProgramCourses', 'unique_parent_code_level');
    await queryInterface.dropTable('ProgramCourses');
  }
};