import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
    return(
        <button className={[
            styles.container,
            props.red && styles.red,
            props.blue && styles.blue,
            props.dark && styles.dark,
            props.lightText && styles.lightText,
        ].join(' ')}
            onClick={props.click}
        >
            {props.children}
        </button>
    );
};

export default Button;
