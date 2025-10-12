// tests/InstructorService.test.js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import path from 'path';
import sequelize from '../src/Config/db.js';
import { DataTypes } from 'sequelize';
import InstructorModelFactory from '../src/api/Models/instructor.js';
import * as InstructorService from '../src/api/Services/InstructorServices.js';

const InstructorModel = InstructorModelFactory(sequelize, DataTypes);
let newInstructor;

describe("Instructor Create", () => {
  const mockInstructorData = {
    first_name: 'Kirukkan',
    last_name: 'Kirruki',
    email: 'Kirrukki@gmail.com',
    phone_number: '017-7454678',
    hire_date: Date.now(),
    department: null
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should create successfully', async () => {
    const result = await InstructorService.CreateInstructor(mockInstructorData);

    expect(result).toEqual({
      success: true,
      message: "Instructor created successfully",
      data: result.data,
    });
  });
});

describe("Instructor Update", () => {
  const mockInstructorData = {
    first_name: 'Kiruskkan',
    last_name: 'Kirruki',
    email: 'Kirrukki@gmais.com',
    phone_number: '017-7454678',
    hire_date: Date.now(),
    department: null
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw error when instructor not found with the given id', async () => {
    vi.spyOn(InstructorModel, 'findByPk').mockResolvedValue(null);

    await expect(
      InstructorService.UpdateInstructor(999, { name: 'Mock Instructor' })
    ).rejects.toThrow("Instructor not found with the given id");

    await expect(
      InstructorService.UpdateInstructor(999, { name: 'Mock Instructor' })
    ).rejects.toMatchObject({ status: 404 });
  });

  it("should successfully update the instructor data", async () => {
    newInstructor = await InstructorModel.create({
      first_name: 'Maths Teacher',
      last_name: 'Kayalvizhi',
      email: 'Kayal@gmais.com',
      phone_number: '017-7454678',
      hire_date: Date.now(),
      department: null
    });

    const mockInstructorId = newInstructor.id;

    const result = await InstructorService.UpdateInstructor(mockInstructorId, mockInstructorData);

    expect(result).toEqual({
      success: true,
      message: "Instructor updated successfully",
      data: expect.objectContaining(mockInstructorData)
    });

    const updatedInstructor = await InstructorModel.findByPk(mockInstructorId);
    expect(updatedInstructor).not.toBeNull();
    expect(updatedInstructor.toJSON()).toEqual(expect.objectContaining(mockInstructorData));
  });

  afterEach(async () => {
    if (newInstructor) {
      await InstructorModel.destroy({ where: { id: newInstructor.id } });
      newInstructor = undefined;
    }
  });
});
