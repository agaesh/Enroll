'use strict';

'use strict';
/** @type {import('sequelize-cli').Migration} */
export default{
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('programcourses', {
      fields: ['parent_id'],
      type: 'foreign key',
      name: 'fk_programcourse_parent', // custom name for the FK
      references: {
        table: 'ProgramCourses',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('programcourses', 'fk_programcourse_parent');
  }
};
