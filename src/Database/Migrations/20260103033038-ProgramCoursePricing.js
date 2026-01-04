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
    await queryInterface.createTable('ProgramCoursePricings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      price_type: {
        type: Sequelize.ENUM("LAB_FEE", "TUITION_FEE", "MATERIAL_FEE", 'EXAM_FEE', 'FLAT_FEE', 'OTHER_FEE'),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      effective_date: {
        type: Sequelize.DATE,
      },
      effective_to: {
        type: Sequelize.DATE,
      },
      ref_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProgramCourses',
          key: 'id'
        }
      },
      ref_type: {
        type: Sequelize.ENUM('PROGRAM', 'COURSE', 'LAB','RESOURCE'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
    await queryInterface.addConstraint('ProgramCoursePricings', {
      fields: ['ref_id', 'price_type', 'effective_date'],
      type: 'unique',
      name: 'unique_course_fee_per_date'
    });
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('ProgramCoursePricings');
  }
};
