import React from 'react';
import styles from './Header.module.css';

const Header = (props) => {
    return(
        <h2 className={styles.container}>
            {props.children}
        </h2>
    );
};

export default Header;
