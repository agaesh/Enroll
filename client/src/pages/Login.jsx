import React, { useRef, useState } from 'react';
import './Login.css';
import Input from '../components/Inputs/Inputs';
import Button from '@mui/material/Button';
import { Link} from 'react-router-dom'; // fixed from 'react-router' to 'react-router-dom'
import Menubar from '../components/Menubar'

const Login = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [digits, setDigits] = useState(Array(6).fill(""));
  const [isOtpSent, setOtpSent] = useState(false);
  const [SignUpEmail, SetSignUpEmail] = useState("");
  const [SignUpPassword, SetSignUpPassword] = useState("");

{/* Form Toggling Functionality handled here*/}
 const  ToggleButtons = () => {
  return (
    <div className="toggle-buttons">
      <button
        className={activeTab === 'signin' ? 'active' : ''}
        onClick={() => setActiveTab('signin')}
      >
        Sign In
      </button>
      <button
        className={activeTab === 'signup' ? 'active' : ''}
        onClick={() => setActiveTab('signup')}
      >
        Sign Up
      </button>
    </div>
  );
}

{/* OTP Verification Section: Handles 5-digit input and email confirmation */}
const OtpSection = ({HandleChange})=>{
  const ref = useRef("");
  return(
      <form>
        <div className="Otp-Section">
          <div style={{textAlign:'center'}}>  
             <h2>Verify Your Email</h2>
          </div>
        
          <p style={{ marginTop: "15px", color: 
                "#333", fontSize: "14px",
                maxWidth:"100%",
                overflow:'word-break'}}>
              An OTP has been sent to <strong>{SignUpEmail}</strong>. Please check your inbox to proceed.
          </p>

          <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
            {digits.map((digit, index) => (
              <Input
                key={index}
                type="text"
                TextBoxStyles={{ width: "40px", textAlign: "center" }}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                name={`digit-${index}`}
              />
            ))}
          </div>

          <Button
            sx={{ width: '100%', padding: '10px' }}
            variant="contained"
            onClick={() => HandleCompleteSignUp()}
          >
            Complete Sign Up
          </Button>
        
          <a 
          href="#" 
          style={{
            display: "block",
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#6c63ff",          // modern accent color
            textDecoration: "none",
            fontWeight: "500",
            transition: "color 0.3s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "#4a47a3"}
          onMouseOut={(e) => e.currentTarget.style.color = "#6c63ff"}
          >
          Didn’t receive a code? <span style={{ fontWeight: "600" }}>Resend the Code</span>
          </a>
        </div>
      </form>
  )
}
{/* Login & Register flows goes here  */}
const LoginRegisterComponent = ()=>{
  const [LoginEmail, SetLoginEmail] = useState("");
  const [LoginPassword, SetLoginPassword] = useState("");

  const handleChange = (index, value) => {
    // only allow single digit 0–9
    if (/^[0-9]?$/.test(value)) {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);
    }
  };

  const HandleEmailVerification = ()=>{
     setOtpSent(true);
  }

  const HandleSubmitProcess = ()=>{

  }

  return (
     <div className='login-page'>
        {/* Sign In form rendered when isOtpSent false */}
      {activeTab === "signin" && !isOtpSent && (
        <div className="form-holder">
          <h2>Start Learning</h2>
          <p style={{ color: 'gray', fontSize: '13px', marginTop: '10px', marginBottom:'10px' }}>
            Access Your Academic
          </p>
   {!isOtpSent &&(<ToggleButtons/>)}
        <form>
          <Input
            label="Email"
            type="text"
            placeholder="Enter your email"
            value={LoginEmail}
            onChange={(e) => SetLoginEmail(e.target.value)}
            name="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={LoginPassword}
            onChange={(e) => SetLoginPassword(e.target.value)}
            name="password"
          />

          <div style={{ marginBottom: "20px", textAlign: "right" }}>
            <Link to="/forgot-password" style={{ fontSize: "13px" }}>
              Forgot Password?
            </Link>
          </div>

          <Button
            sx={{ width: '100%', padding: '10px' }}
            variant="contained"
            onClick={() => HandleFormSubmission()}
          >
            Sign In
          </Button>
        </form>
        </div>
      )}
        {/* Sign Up form rendered when isOtpSent false */}
      {activeTab === "signup" && !isOtpSent && (
        <div className="form-holder">
          <h2>Join Now</h2>
          <p style={{ color: 'gray', fontSize: '13px', marginTop: '10px', marginBottom:'10px' }}>
            Track Your Progress, Learn Remotely
          </p>
             {!isOtpSent &&(<ToggleButtons/>)}
          <form>
            <Input
              label="Enter Your Email"
              type="text"
              placeholder="John@gmail.com"
              value={SignUpEmail}
              onChange={(e) => SetSignUpEmail(e.target.value)}
              name="email"
            />
            
            <Input
              label="Enter Password"
              type="password"
              placeholder="Password"
              value={SignUpPassword}
              onChange={(e) => SetSignUpPassword(e.target.value)}
              name="email"
            />

            <Button
              sx={{ width: '100%', padding: '10px' }}
              variant="contained"
              onClick={() => HandleEmailVerification()}
            >
            Sign Up
            </Button>
          </form>
        </div>
      )}

      {/* Otp Section Rendered when isOtpSent is true*/}
      {isOtpSent && (
        <div className = "form-holder">
          <Button
          variant="text"
          sx={{ marginBottom: "10px", color: "#6c63ff", textTransform: "none" }}
          onClick={() => setOtpSent(false)}
          >
           ← Back to Sign Up
          </Button>

          <OtpSection HandleChange={handleChange}/>
      </div>
     )}     
    </div>
  )
}

  return (
    <>
    <Menubar/>
    <LoginRegisterComponent/>
    </>
  );
};

export default Login;
