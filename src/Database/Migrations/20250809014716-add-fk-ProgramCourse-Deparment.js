'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('ProgramCourses', {
      fields: ['department_id'],
      type: 'foreign key',
      name: 'fk_programcourses_department_id', // custom constraint name
      references: {
        table: 'Departments',
        field: 'department_id' // correct key name in Departments table
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'ProgramCourses',
      'fk_programcourses_department_id'
    );
  }
};
