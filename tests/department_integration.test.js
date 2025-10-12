import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import DepartmentRouter from '../Routes/DepartmentRoute.js';
import sequelize from '../Config/db.js'; // Your Sequelize instance
import DepartmentModelFactory from '../Models/department.js';
import { DataTypes } from 'sequelize';

// Setup test app
const app = express();
app.use(express.json());
app.use('/api/department', DepartmentRouter);

// Initialize Department model for testing
const Department = DepartmentModelFactory(sequelize, DataTypes);

beforeAll(async () => {
  // Sync database (force: true to reset)
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  // Close DB connection after tests
  await sequelize.close();
});

describe('Department Routes Integration Test', () => {
  let departmentId;

  it('GET /api/department should return welcome message', async () => {
    const res = await request(app).get('/api/department');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Welcome To Department API');
  });

  it('POST /api/department should create a new department', async () => {
    const res = await request(app)
      .post('/api/department')
      .send({ name: 'HR', description: 'Human Resources' });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('HR');

    departmentId = res.body.id;
  });

  it('GET /api/department/listing should return all departments', async () => {
    const res = await request(app).get('/api/department/listing');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('PUT /api/department should update a department', async () => {
    const res = await request(app)
      .put('/api/department')
      .send({ id: departmentId, name: 'HR Updated', description: 'Updated Description' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('HR Updated');
  });
});
