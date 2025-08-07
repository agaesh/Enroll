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

 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('instructors', 'department_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('instructors', 'department_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'departments',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  }
}
}
}
