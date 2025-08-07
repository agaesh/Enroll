'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('DepartmentInstructors', [
      {
        id:1,
        instructor_id: 1,
        department_id: 1,
        created_by: 1, // Optional, if you use this field
        is_active: true,
      },
      {
        id:2,
        instructor_id: 2,
        department_id: 1,
        created_by: 1,
        is_active: true,
      },
      {
        id:3,
        instructor_id: 3,
        department_id: 2,
        created_by: 2,
        is_active: true,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DepartmentInstructors', null, {});
  }
};
