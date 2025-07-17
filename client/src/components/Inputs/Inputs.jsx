// src/components/Input/Input.jsx
import React from 'react';
import styles from './inputs.module.css';

const Input = ({ label, placeholder, type = "text", value, onChange, name }) => {
  return (
    <div className={styles.inputGroup}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      /> 
    </div>
  );
};

export default Input;
