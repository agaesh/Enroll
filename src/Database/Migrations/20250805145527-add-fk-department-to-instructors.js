'use strict';

/** @type {import('sequelize-cli').Migration} */
export default{
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addConstraint('Instructors', {
      fields: ['department'],
      type: 'foreign key',
      name: 'fk_instructors_department_id', // custom constraint name
      references: {
        table: 'Departments',
        field: 'department_id'
      },
      onUpdate: 'SET NULL',
      onDelete: 'RESTRICT' // can change to CASCADE or RESTRICT
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('Instructors', 'fk_instructors_department_id');
  }
};
