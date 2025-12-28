'use strict';
/** @type {import('sequelize-cli').Migration} */
export default{
  async up(queryInterface, Sequelize) {
    // 1. Find the Computer Science department
    const [csDept] = await queryInterface.sequelize.query(
      `SELECT department_id FROM Departments WHERE department_code = 'CS101' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!csDept) {
      throw new Error("Computer Science department not found! Please seed it first.");
    }

    const departmentId = csDept.department_id;

    // 2. Insert PROGRAMS for Computer Science
    const programs = await queryInterface.bulkInsert(
      'ProgramCourses',
      [
        {
          parent_id: null,
          type: 'PROGRAM',
          code: 'CS_DIP',
          name: 'Diploma in Computer Science',
          department_id: departmentId,
          credit_hours: null,
          semester: null,
          level: 'DIPLOMA',
          is_active: true,
          mode: 'FULLTIME',
        },
        {
          parent_id: null,
          type: 'PROGRAM',
          code: 'CS_DEG',
          name: 'Bachelor of Computer Science',
          department_id: departmentId,
          credit_hours: null,
          semester: null,
          level: 'DEGREE',
          is_active: true,
          mode: 'FULLTIME',
        },
        {
          parent_id: null,
          type: 'PROGRAM',
          code: 'CS_MAS',
          name: 'Master of Computer Science',
          department_id: departmentId,
          credit_hours: null,
          semester: null,
          level: 'MASTER',
          is_active: true,
          mode: 'FULLTIME',
        },
        {
          parent_id: null,
          type: 'PROGRAM',
          code: 'CS_DOC',
          name: 'Doctorate in Computer Science',
          department_id: departmentId,
          credit_hours: null,
          semester: null,
          level: 'DOCTORATE',
          is_active: true,
          mode: 'FULLTIME',
        }
      ],
      { returning: true }
    );

    // 3. Handle MySQL — fetch programs back if IDs aren’t returned
    let insertedPrograms;
    if (Array.isArray(programs) && programs.length && programs[0].id) {
      insertedPrograms = programs;
    } else {
      insertedPrograms = await queryInterface.sequelize.query(
        `SELECT id, level FROM ProgramCourses WHERE department_id = ${departmentId} AND type='PROGRAM';`,
        { type: Sequelize.QueryTypes.SELECT }
      );
    }

    // 4. Create COURSES for each PROGRAM
    const courses = [];
    insertedPrograms.forEach((program) => {
      courses.push(
        {
          parent_id: program.id,
          type: 'COURSE',
          code: `${program.level}_C01`,
          name: `${program.level} Course 1`,
          department_id: departmentId,
          credit_hours: 3,
          semester: 1,
          level: program.level,
          is_active: true,
          mode: 'FULLTIME',
        },
        {
          parent_id: program.id,
          type: 'COURSE',
          code: `${program.level}_C02`,
          name: `${program.level} Course 2`,
          department_id: departmentId,
          credit_hours: 3,
          semester: 2,
          level: program.level,
          is_active: true,
          mode: 'FULLTIME',
        }
      );
    });

    // 5. Insert COURSES
    await queryInterface.bulkInsert('ProgramCourses', courses);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProgramCourses', null, {});
  }
};
