// 2. Optimized CustomButton
const CustomButton = ({
    text,
    icon,
    variant = 'secondary',
    onClick,
    isFirst = false
}) => {
    const variants = {
        primary: { bg: '#2563eb', color: '#fff', border: '#2563eb' },
        secondary: { bg: '#ffffff', color: '#374151', border: '#d1d5db' },
        warning: { bg: '#f59e0b', color: '#fff', border: '#d97706' },
        danger: { bg: '#dc2626', color: '#fff', border: '#dc2626' },
    };

    const selected = variants[variant] || variants.secondary;

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        cursor: 'pointer',
        backgroundColor: selected.bg,
        color: selected.color,
        border: 'none', // We use the container's border and dividers
        // Divider line logic: Add a left border to everything EXCEPT the first button
        borderLeft: isFirst ? 'none' : `1px solid rgba(0,0,0,0.1)`,
        transition: 'all 0.2s',
        outline: 'none',
    };

    return (
        <button
            style={buttonStyle}
            onClick={onClick}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(95%)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(100%)'}
        >
            {icon && <span style={{ display: 'flex' }}>{icon}</span>}
            {text}
        </button>
    );
};

export default CustomButton;
