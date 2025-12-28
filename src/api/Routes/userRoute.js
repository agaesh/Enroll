import express from 'express';
import userController from '../Controllers/userController.js';
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  res.status(200).send('Welcome To User API');
});

// POST /api/users/register
router.post('/register', async (req, res) => {
  await userController.registerUser(req, res);
});

// POST /api/users/login
router.post('/login', async (req, res) => {
  await userController.LoginUser(req, res);
});

// POST /api/users/logout
router.post('/logout', async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// GET /api/users/testProtectRoutes
router.get('/testProtectRoutes', (req, res) => {
  console.log('Token from cookie:', req.cookies.token); // ✅ Logs token to terminal
  res.status(200).json({
    message: 'Protected route accessed',
    token: req.cookies.token,
  });
});

export default router;
