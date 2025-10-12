// --- ES Module Setup for __dirname and __filename ---
// Import necessary modules for path resolution in ES modules
import path from 'path';
import { fileURLToPath } from 'url';

// Derive ES module equivalents for CJS context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__basedir = __dirname; // Set the global basedir

// --- Imports ---
import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';

// Initialize dotenv configuration immediately
config();

// Service Imports (Note: Must include .js extension for local modules)
import UserRegister from "../api/Services/UserService.js";
import ProgramService from '../api/Services/ProgramCourseServices.js';

// Route Imports (Note: Must include .js extension for local modules)
import userRoutes from '../api/Routes/userRoute.js';
import ProgramRoutes from '../api/Routes/ProgramRoutes.js';
import departmentRoutes from '../api/Routes/DepartmentRoutes.js';
import InstructorRoutes from "../api/Routes/InstructorRoutes.js";

// --- Application Setup ---
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Example route
app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});

// Use the routers at their mount paths
app.use('/users', userRoutes);
app.use('/program', ProgramRoutes);
app.use('/department', departmentRoutes);
app.use("/instructor", InstructorRoutes);

// --- Start Server ---
app.listen(port, () => {
    console.log(`Express API listening at http://localhost:${port}`);
});