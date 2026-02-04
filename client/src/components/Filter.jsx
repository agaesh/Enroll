import { useState, useRef, useEffect } from "react";
import "../css/Filter.css";

const Filter = ({ placeholder = "Select option", options = [] }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const dropdownRef = useRef(null);

    // Toggle dropdown
    const toggleDropdown = () => setOpen(!open);

    // Handle checkbox change
    const handleCheckbox = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Display selected labels
    const displayText =
        selected.length > 0
            ? `${placeholder} (${selected.length})`
            : "";

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className={`dropdown-input ${selected.length > 0 ? "active-border" : ""}`}
                 onClick={toggleDropdown}>
                <input
                    type="text"
                    className="filter"
                    placeholder={placeholder}
                    readOnly
                    value={displayText}
                />
                <span className={`chevron ${open ? "rotate" : ""}`}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 10.5L12 14.5L16.5 10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </div>

            {open && (
                <ul className="dropdown-menu">
                    {options.map((option) => (
                        <li key={option.key} className="options">
                            <input
                                type="checkbox"
                                id={option.id}
                                checked={selected.includes(option.id)}
                                onChange={() => handleCheckbox(option.id)}
                            />
                            <label htmlFor={option.id}>{option.label}</label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Filter;