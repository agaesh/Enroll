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

describe("Delete-Department", () => {
  it("should throw 'ID Must Be Provided'", async () => {
    await expect(DepartmentService.DeleteDepartment())
      .rejects
      .toThrow("ID must be provided");
  });

  it("should throw 'No department found with the given ID'", async()=>{
    await expect(DepartmentService.DeleteDepartment(1231))
    .resolves.toBe("No department found with the given ID");
  })
});
