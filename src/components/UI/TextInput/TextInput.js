import React from 'react';
import styles from './TextInput.module.css';

const TextInput = (props) => {
    return(
        <div className={styles.container}>
            <label htmlFor={props.name} className={styles.label}>
                {props.labelText}
            </label>
            <input
                type={props.type}
                className={styles.input}
                onChange={(e)=>props.onChange(e)}
            />
        </div>
    );
};

export default TextInput;
