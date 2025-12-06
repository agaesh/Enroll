const path = require('path');
global.__basedir = path.join(__dirname, '..', '..');
global.__srcdir = path.join(global.__basedir, 'src');

const express = require('express');
const app = express();
const port = 3000;
const cookieparser = require('cookie-parser');
app.use(express.json());
app.use(cookieparser());
require('dotenv').config();

// const UserRegister = require("../api/Services/UserService");
// const ProgramService = require('../api/Services/ProgramCourseServices')
// Require the router
console.log(global.__srcdir);
// const userRoutes = require(path.join(global.__srcdir, 'api', 'Routes', './userRoute.js'));
const ProgramRoutes = require(path.join(global.__srcdir, 'api', 'Routes', 'ProgramRoutes.js'));
const departmentRoutes = require(path.join(global.__srcdir, 'api', 'Routes', 'DepartmentRoutes.js'));
const InstructorRoutes = require(path.join(global.__srcdir, 'api', 'Routes', 'InstructorRoutes.js'));
console.log("hello")
// Example route
app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});
app.use(express.urlencoded({ extended: true }));
// Use the router at a mount path
// app.use('/users', userRoutes);
app.use('/program', ProgramRoutes);
app.use('/department', departmentRoutes);
// app.use("/instructor", InstructorRoutes);
app.listen(port, () => {
    console.log(`Express API listening at http://localhost:${port}`);
});