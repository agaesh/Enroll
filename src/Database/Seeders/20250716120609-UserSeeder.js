'use strict';

const {faker, fakerSK} = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */

const users = [];
const roles = ['student', 'lecturer'];
const status = [true,false];
for (let i = 0; i < 10; i++) {
  users.push({
    username: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: roles[Math.floor(Math.random() * roles.length)],
    is_active: status[Math.floor(Math.random) * status.length],
    lastlogin: faker.date.anytime(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime()
  });

  await queryInterface.bulkInsert('Users',users);
}

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users',null,{})
  }
};
