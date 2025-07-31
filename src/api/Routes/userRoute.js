const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

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

module.exports = router;
