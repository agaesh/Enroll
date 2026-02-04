import React from 'react';
import styles from '../css/program.module.css';
import { BiTrash } from "react-icons/bi";

const ProgramCard = ({ title, description, onViewDetails }) => {
    return (
        <div className={styles.card}>
            
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            

            <button onClick={onViewDetails} className={styles.button}>
                View Details
            </button>

            {/*<button*/}
            {/*    style={{*/}
            {/*        background: 'white',*/}
            {/*        border: '1px solid #ddd',*/}
            {/*        padding: '6px',*/}
            {/*        display: 'inline-flex',*/}
            {/*        alignItems: 'center',*/}
            {/*        justifyContent: 'center',*/}
            {/*        cursor: 'pointer',*/}
            {/*        color: 'red',*/}
            {/*        transition: 'all 0.2s ease',*/}
            {/*        width: '45px',*/}
            {/*        height: '45px',        // make height equal to width*/}
            {/*        borderRadius: '50%',   // makes it a circle*/}
            {/*        bottom: '20px',*/}
            {/*        zIndex: 1,*/}
            {/*        position: 'absolute'*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <BiTrash />*/}
            {/*</button>*/}
        </div>
    );
};

export default ProgramCard;