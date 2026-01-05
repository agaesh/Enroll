import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class ProgramCourse extends Model {
    static associate(models) {
      // Self-referencing association
      ProgramCourse.belongsTo(models.ProgramCourse, {
        as: 'parent',
        foreignKey: 'parent_id',
      });

      ProgramCourse.hasMany(models.ProgramCourse, {
        as: 'children',
        foreignKey: 'parent_id',
      });

      // Department association
      ProgramCourse.belongsTo(models.Department, {
        foreignKey: 'department_id',
        as: 'department',
      });
    }
  }

  ProgramCourse.init(
    {
      parent_id: DataTypes.INTEGER,
      type: {
        type: DataTypes.ENUM('PROGRAM', 'COURSE', 'EXAM'),
        allowNull: false,
        defaultValue: null,
      },
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      department_id: DataTypes.INTEGER,
      credit_hours: DataTypes.INTEGER,
      semester: DataTypes.INTEGER,
      level: {
        type: DataTypes.ENUM('DIPLOMA', 'DEGREE', 'MASTER', 'DOCTORATE'),
        allowNull: false,
      },
      is_active: DataTypes.BOOLEAN,
      mode: {
        type: DataTypes.ENUM('FULLTIME', 'PARTTIME', 'ONLINE', 'HYBRID', 'DISTANCE'),
        allowNull: false,
        defaultValue: '',
      },
      activity_type: {
      type: DataTypes.ENUM(
        // Exam types
        'MIDTERM', 'FINAL', 'QUIZ', 'PRACTICAL', 'ORAL',
        // Lab types
        'PROJECT', 'WORKSHOP', 'PRACTICAL_LAB'
      ),
      allowNull: true,
      },
    // Exam && LAB specific fields
      start_date: {
        type: DataTypes.DATETIME,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.DATETIME,
        allowNull: true,
      },
      total_marks: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      location: {
        type: DataTypes.ENUM('HALL', 'LAB', 'ONLINE'),
        allowNull: true,
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
        length: 500
      }
    },
    {
      sequelize,
      modelName: 'ProgramCourse',
      timestamps: true,
    }
  );

  return ProgramCourse;
};
