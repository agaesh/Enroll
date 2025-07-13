global.__basedir = __dirname;
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const UserRegister = require("../api/Services/UserService");
// Require the router
const userRoute = require('../api/Routes/userRoute');

// Example route
app.get('/', (req, res) => {
    res.send('Hello from Express API!');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use the router at a mount path
app.use('/users', userRoute);

app.listen(port, () => {
    console.log(`Express API listening at http://localhost:${port}`);
});