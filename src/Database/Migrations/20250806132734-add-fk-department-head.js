'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Departments', {
      fields: ['head_id'],
      type: 'foreign key',
      name: 'fk_head_department_id', // custom constraint name
      references: {
        table: 'Instructors',
        field: 'id'
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
     await queryInterface.removeConstraint('Instructors', 'fk_head_department_id');
  }
};
