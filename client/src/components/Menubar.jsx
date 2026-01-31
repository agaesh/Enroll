// src/components/Menubar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css'; // optional styling file

const Menubar = () => {
  return (
    <nav className="menubar">
      <h2>Enroll<span>Now</span></h2>
      <ul>
        <li><Link to="/Course">Home</Link></li>
        <li><Link to= "/">E-Learning</Link></li>
        <li><Link to="/admission">Admissions</Link></li>
        <li><Link to="/enroll">About Us</Link></li>
      </ul>
    </nav>
  );
};

export default Menubar;
