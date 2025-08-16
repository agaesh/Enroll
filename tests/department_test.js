// tests/DepartmentService.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
const path = require('path');
const base = path.resolve(__dirname, '../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const DepartmentModel = require('../src/api/Models/department')(sequelize, DataTypes)
const DepartmentService = require('../src/api/Services/DepartmentServices')

describe('DepartmentService - CreateDepartment', () => {
  const mockDepartmentData = {
    department_name: 'Finance',
    department_code: 'GBS-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    head_id: 1,
    email: 'fdasdaf'
  };

  beforeEach(() => {
    // reset all mocks before each test
    vi.restoreAllMocks();
  });

  it('should create a department successfully', async () => {
    // Mock Sequelize create method
//  vi.spyOn(DepartmentModel, 'create').mockResolvedValue(null);

    const result = await DepartmentService.CreateDeparment(mockDepartmentData);

    expect(result).toEqual({
      message: 'Department created successfully',
      department: result.department
    });
    // expect(DepartmentModel.create).toHaveBeenCalledWith(mockDepartmentData);
  });

  it('should throw error if creation fails due to empty department code', async () => {
    const invalidDepartmentData = {
      ...mockDepartmentData,
      department_code: '' // force empty code
    };

    // // Mock create to simulate DB returning null
    // vi.spyOn(DepartmentModel, 'create').mockResolvedValue(null);

    await expect(DepartmentService.CreateDeparment(invalidDepartmentData))
      .rejects
      .toThrow('Validation error');
  });
});

describe("UpdateDepartment Service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should throw error if ID is not provided", async () => {
    await expect(
      DepartmentService.UpdateDepartment({ department_name: "Finance" })
    ).rejects.toThrow("ID must be provided");
  });

  it("should throw error if no update fields are provided", async () => {
    await expect(
      DepartmentService.UpdateDepartment({ department_id: 1 })
    ).rejects.toThrow("At-Least One Department fields must be provided to update");
  });

it("should throw error if department not found", async () => {
  vi.spyOn(DepartmentModel, "findOne").mockResolvedValue(null);
  await expect(
    DepartmentService.UpdateDepartment({
      department_id: 123, // make sure this matches your service
      department_code:"DDSF",
      department_name: "Finance",
    })
  ).rejects.toThrow("No Deparment found with the given department id");
});

  it("should update department successfully using real DB record", async () => {
    // First, get an existing department from the database
    const existingDepartment = await DepartmentModel.findOne(); // fetch first available record
    if (!existingDepartment) {
      throw new Error("No department found in DB to test update");
    }

    // Update the department name
    const newName = "Finance_" + Date.now(); // to avoid duplicate names
    const result = await DepartmentService.UpdateDepartment({
      department_id: existingDepartment.department_id,
      department_name: newName,
    });

    expect(result).toBe("Department updated successfully");

    // Verify the update in DB
    const updatedDepartment = await DepartmentModel.findOne({
      where: { department_id: existingDepartment.department_id },
    });
    expect(updatedDepartment.department_name).toBe(newName);
  });
});
describe("Delete-Department", () => {
  it("should throw 'ID Must Be Provided'", async () => {
    await expect(DepartmentService.DeleteDepartment())
      .rejects
      .toThrow("ID must be provided");
  });

  it("should throw 'No department found with the given ID'", async()=>{
    await expect(DepartmentService.DeleteDepartment(1231))
    .rejects.toThrow("No department found with the given ID");
  })
});
