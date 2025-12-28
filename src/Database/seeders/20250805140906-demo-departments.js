'use strict';
/** @type {import('sequelize-cli').Migration} */
export default{
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Departments', [
      {
        department_id:1,
        department_name: 'Computer Science',
        department_code: 'CS101',
        head_id: null,
        email: 'cs@university.edu',
        phone_number: '123-456-7890',
        building: 'Block A',
      },
      {
        department_id:2,
        department_name: 'Electrical Engineering',
        department_code: 'EE202',
        head_id: null,
        email: 'ee@university.edu',
        phone_number: '987-654-3210',
        building: 'Block B',
      },
      {
        department_id:3,
        department_name: 'Mechanical Engineering',
        department_code: 'ME303',
        head_id: null,
        email: 'me@university.edu',
        phone_number: '456-789-0123',
        building: 'Block C',
      }
    ], {
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};
