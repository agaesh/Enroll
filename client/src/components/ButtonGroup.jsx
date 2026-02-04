import React from 'react';

// 1. Fixed ButtonGroup (Corrected Shadow)
const ButtonGroup = ({ children }) => {
    const groupStyle = {
        display: 'inline-flex',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', // Fixed property name
        overflow: 'hidden',
        border: '1px solid #d1d5db', // Outer container border
    };

    return (
        <div style={groupStyle} role="group">
            {children}
        </div>
    );
};

export default ButtonGroup