const path = require('path');
const { User } = require(path.join(global.__srcdir, 'api', 'Models'));

exports.registerUser = async (body) => {
  try {
    // Handle user registration
    const username = body.username;
    const email = body.email;
    let password = body.password;

    // Call DB or validation logic
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      const error = new Error('Email already in use');
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    password = hashedPassword
    const newUser = await User.create({ username, email, password });
    return newUser; // controller will format and send response
    
  } catch (error) {
    throw error;
  }
};

exports.LoginUser = async(body)=>{
  try{

    const email = body. email;
    const password = body.password;
    const findUser = await User.findOne({
    where: { email }
    });

    if (!findUser) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const validatePassword = await bcrypt.compare(password, findUser.password)

    if(!validatePassword){
      const error = new Error('Invalid credentials' ) 
      error.status = 401;
      throw error
    }

    const token = jwt.sign({ id: findUser.id, email: findUser.email }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

     // Return both token and user data (excluding password)
    return {
      token,
      user: findUser.toJSON()
    };
   
  }catch(error){
    throw error;
  }
}
