'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Instructors', [
      {
        first_name: 'Agaesh',
        last_name: 'Kumar',
        email: 'agaesh.kumar@example.com',
        phone_number: '0123456789',
        hire_date: new Date('2023-01-10'),
        department: 20, // Replace with actual existing department_id
        is_active: true
      },
      {
        first_name: 'Nisha',
        last_name: 'Ravi',
        email: 'nisha.ravi@example.com',
        phone_number: '0198765432',
        hire_date: new Date('2022-07-25'),
        department: 21,
        is_active: true
      },
      {
        first_name: 'Arun',
        last_name: 'Raj',
        email: 'arun.raj@example.com',
        phone_number: '0172345678',
        hire_date: new Date('2021-09-15'),
        department: 22,
        is_active: false
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Instructors', null, {});
  }
};
