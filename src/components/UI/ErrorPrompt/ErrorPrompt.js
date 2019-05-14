import React from 'react';
import styles from './ErrorPrompt.module.css';
import errorIcon from '../../../img/errorIcon.svg';

const ErrorPrompt = (props) => {
    return(
        <div className={styles.container}>
            <img src={errorIcon} alt="" className={styles.errorIcon}/>
            <div className={styles.message}>{props.message}</div>
        </div>
    );
};

export default ErrorPrompt;
