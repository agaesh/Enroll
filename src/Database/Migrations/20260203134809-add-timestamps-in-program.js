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

    await queryInterface.addColumn('ProgramCourses', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });

    await queryInterface.addColumn('ProgramCourses', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

      await queryInterface.removeColumn('ProgramCourses','createdAt');
      await queryInterface.removeColumn('ProgramCourses', 'updatedAt')
  }
};
