const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { json } = require('sequelize');

// POST /api/users/register
router.get("/", (req, res) => {
  res.status(200).send("Welcome To User API");
});
router.post('/register', async (req, res) => {
    await userController.registerUser(req, res);
});

router.post('/login', async(req,res)=>{
  await userController.LoginUser(req,res);
})

router.post('/logout', async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

router.get("/testProtectRoutes", (req, res) => {
  console.log("Token from cookie:", req.cookies.token); // ✅ This prints to your terminal
  res.status(200).json({ 
    message: "Protected route accessed", 
    token: req.cookies.token 
  });
});
module.exports = router;
