'use strict';
 import { Sequelize, where } from 'sequelize';
 import ProgramCourse from '../../api/Models/ProgramCourse.js';
import { query } from 'express-validator';
import sequelize from '../../Config/db.js';
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
    */
    const courses = await ProgramCourses.findAll({ attributes: ['id', 'type'],
      where: { type: { [Sequelize.Op.in]: ['COURSE'] } }
    });

    // Pick a random one
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    const Lab = courses.filter(c => c.type === 'LAB');
    const randomLab = Lab[Math.floor(Math.random() * Lab.length)];

    await queryInterface.bulkInsert('ProgramCoursePricings', [
      {
        price_type: 'TUITION_FEE',
        price: 1500.00,
        effective_date: new Date('2024-01-01'),
        effective_to: new Date('2024-12-31'),
        ref_id: randomCourse.id,
        ref_type: 'PROGRAM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        parent_id: randomCourse.id,
        price_type: 'LAB_FEE',
        price: 300.00,
        effective_date: new Date('2024-01-01'),
        effective_to: new Date('2024-12-31'),
        ref_id: randomLab.id,
        ref_type: 'COURSE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        price_type: 'MATERIAL_FEE',
        price: 200.00,
        effective_date: new Date('2024-06-01'),
        effective_to: new Date('2024-12-31'),
        ref_id: 1,
        ref_type: 'PROGRAM',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
