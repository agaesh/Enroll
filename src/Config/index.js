global.__basedir = __dirname;
const express = require('express');
const app = express();
const port = 3000;
const cookieparser = require('cookie-parser');
app.use(express.json());
app.use(cookieparser());
require('dotenv').config();

const UserRegister = require("../api/Services/UserService");
const ProgramService = require('../api/Services/ProgramCourseServices')
// Require the router
const userRoute = require('../api/Routes/userRoute');
const ProgramRoute = require('../api/Routes/ProgramRoutes');
const departmentRoutes= require('../api/Routes/DepartmentRoutes')

// Example route
app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});
app.use(express.urlencoded({ extended: true }));
// Use the router at a mount path
app.use('/users', userRoute);
app.use('/program', ProgramRoute)
add.use('/deparment', departmentRoutes)
app.listen(port, () => {
    console.log(`Express API listening at http://localhost:${port}`);
});