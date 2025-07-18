// src/pages/Login.jsx
import React, { useState } from 'react';
import Input from '../components/Inputs/Inputs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log("Logging in with:", email, password);
  //   // Add your login logic here
  // };

  return (
    <>
        <Input
          label="Email"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
        
        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
          <Link to="/forgot-password" style={{ fontSize: '13px' }}>
            Forgot Password?
          </Link>
        </div>

        <Button
          sx={{ width: '100%', padding: '10px' }}
          variant="contained"
          onClick={() => console.log('Clicked')}
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
