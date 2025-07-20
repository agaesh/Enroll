import React, { useState } from 'react';
import './Login.css';
import Input from '../components/Inputs/Inputs';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // fixed from 'react-router' to 'react-router-dom'
import Menubar from '../components/Menubar'

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
    <Menubar/>
    <div className='login-page'>
      <div className="form-holder">
        <h3>Welcome To</h3>
        <h2>Student Portal</h2>
        <p style={{ color: 'gray', fontSize: '13px', marginTop: '10px', marginBottom:'10px' }}>
          Log in using your student credentials to access your courses, grades, class schedules, and other academic resources.
        </p>

        <form>
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
            onClick={() => console.log("Clicked")}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
