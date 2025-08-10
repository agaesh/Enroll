'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Fetch all instructors
    const [instructors] = await queryInterface.sequelize.query(
      "SELECT id FROM Instructors"
    );

    // Fetch all departments (so we can randomly assign)
    const [departments] = await queryInterface.sequelize.query(
      "SELECT department_id FROM Departments"
    );

    if (instructors.length === 0 || departments.length === 0) {
      throw new Error('No instructors or departments found. Seed them first.');
    }

    const departmentInstructors = instructors.map((instructor, index) => {
      const randomDept =
        departments[Math.floor(Math.random() * departments.length)];

      return {
        id: index + 1,
        instructor_id: instructor.id,
        department_id: randomDept.department_id,
        is_active: true,
      };
    });

    await queryInterface.bulkInsert('DepartmentInstructors', departmentInstructors);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DepartmentInstructors', null, {});
  }
};
