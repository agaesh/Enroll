// src/components/Menubar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css'; // optional styling file

const Menubar = () => {
  return (
    <nav className="menubar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/enroll">Enroll</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Menubar;
