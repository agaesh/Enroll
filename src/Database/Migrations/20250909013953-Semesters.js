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
    await queryInterface.createTable('Semester', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      semester_name: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      seq_no: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '1, 2, 3 …',
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('ACTIVE', 'DISABLE', 'DELETE'),
        allowNull: true,
      },
      intake_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ProgramCourses', // table name in DB
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      created_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      remarks: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
    });

     // Add unique constraint (intake_id + seq_no)
    await queryInterface.addConstraint('Semester', {
      fields: ['intake_id', 'seq_no'],
      type: 'unique',
      name: 'uq_program_semester',
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

  //  await queryInterface.removeConstraint('Semester', 'uq_program_semester');
   await queryInterface.dropTable('Semester')
  }
};
