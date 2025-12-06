const path = require('path');
const userService = require(path.join(global.__srcdir, 'api', 'Services', 'UserService'));

exports.registerUser = async (req, res) => {
  try {
    const newUser = await userService.registerUser(req.body);
    if(newUser){
      res.status(201).json({
          message: 'User registered successfully!',
          userId: newUser.id
      });
    }
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};

exports.LoginUser = async(req,res)=>{
  try{
      
    const isLogin  = await userService.LoginUser(req.body)

    res.cookie('token', isLogin.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000 
    });

    if(isLogin) {
      return res.status(200).json({
        message: 'Login successful',
      });
    }
  }catch(error){
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
}
