// tests/DepartmentService.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { options } from '../src/api/Routes/InstructorRoutes';
import { readSync } from 'fs';
const path = require('path');
const base = path.resolve(__dirname, '../');
const sequelize = require(path.join(base, 'src', 'config', 'db.js'));
const { DataTypes } = require('sequelize');
const InstructorModel = require('../src/api/Models/instructor')(sequelize, DataTypes);
const InstructorService = require('../src/api/Services/InstructorServices');
const newInstructor = undefined

describe("Instructor Create", ()=>{
      const mockInstructorData = {
        first_name: 'Kirukkan',
        last_name: 'Kirruki',
        email: 'Kirrukki@gmail.com',
        phone_number: '017-7454678',
        hire_date: Date.now(),
        department: null
      };
    
      beforeEach(() => {
        // reset all mocks before each test
        vi.restoreAllMocks();
      });
    
      it('should create a successfully', async () => {
        // Mock Sequelize create method
    //  vi.spyOn(DepartmentModel, 'create').mockResolvedValue(null);
    
        const result = await InstructorService.CreateInstructor(mockInstructorData);
    
        
      expect(result).toEqual({
        success: true,
        message: "Instructor created successfully",
        data: result.data,
      });
        // expect(DepartmentModel.create).toHaveBeenCalledWith(mockDepartmentData);
      });
})

describe('test update method of', ()=>{
    const mockInstructorData = {
        first_name: 'Kiruskkan',
        last_name: 'Kirruki',
        email: 'Kirrukki@gmais.com',
        phone_number: '017-7454678',
        hire_date: Date.now(),
        department: null
      };

      beforeEach(() => {
        // reset all mocks before each test
        vi.restoreAllMocks();
      });

      it('should throw error when Instructor not found with the given id', async () => {
        // Mock Sequelize findByPk to return null
        vi.spyOn(InstructorModel, 'findByPk').mockResolvedValue(null);

        // Call service and expect rejection
        await expect(
          InstructorService.UpdateInstructor(999, { name: 'Mock Instructor' })
        ).rejects.toThrow("Instructor not found with the given id");

        // Optional: also check the custom status property
        await expect(
          InstructorService.UpdateInstructor(999, { name: 'Mock Instructor' })
        ).rejects.toMatchObject({ status: 404 });
      });

   
    it("should succesfull update the Instructor Data"), async() =>{
      const newInstructor = await InstructorModel.create({
        first_name: 'Maths Teacher',
        last_name: 'Kayalvizhi',
        email: 'Kayal@gmais.com',
        phone_number: '017-7454678',
        hire_date: Date.now(),
        department: null
    });

    const mockInstructorId = newInstructor.id; // 👈 real generated id
 
    const result = await InstructorService.UpdateInstructor(mockInstructorData);
    expect(result).toEqual({
      success:true,
      message: "Instructor updated successfully",
      data: expect.objectContaining(mockInstructorData)
    });
    console.log(result)
            // Fetch from DB again to ensure it's really updated
    const updatedInstructor = await Instructor.findByPk(mockInstructorId);

    expect(updatedInstructor).not.toBeNull();
    expect(updatedInstructor.toJSON()).toEqual(expect.objectContaining(mockInstructorData));
    }
    afterEach(async () => {
      // Delete the test record to clean DB
      if (newInstructor) {
        await InstructorModel.destroy({ where: { id: newInstructor.id } });
      } 
    });
})