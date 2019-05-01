import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
    const classList = ('container ' + props.classes).split(' ')
                        .map(classProp => styles[classProp])
    return(
        <button className={classList.join(' ')}
            onClick={props.click}
        >
            {props.children}
        </button>
    );
};

export default Button;
