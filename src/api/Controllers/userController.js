const userService = require('../Services/UserService');

exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);

    res.status(201).json({
      message: 'User registered successfully!',
      userId: newUser.id
    });


  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};