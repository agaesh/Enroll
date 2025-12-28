'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DepartmentInstructors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      instructor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Instructors', // Ensure this matches your actual instructors table name
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Departments', // Ensure this matches your actual departments table name
          key: 'department_id'  // Or 'id' if that's the PK in Departments
        },
        onDelete: 'CASCADE'
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      created_by: {
       type: Sequelize.INTEGER,
       allowNull: true, // Or false if required
      references: {
        model: 'Users', // Table name (case-sensitive depending on DB)
        key: 'id'
      },
      onDelete: 'SET NULL' // or 'CASCADE' depending on your logic
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DepartmentInstructors');
  }
};
