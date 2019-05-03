import React from 'react';
import styles from './Form.module.css';

const Form = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.form}>
                {props.children}
            </div>
        </div>
    );
};

export default Form;
