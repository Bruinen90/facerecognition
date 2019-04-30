import React from 'react';
import styles from './Nav.module.css';
import Button from '../UI/Button/Button';

const Nav = (props) => {
    return(
        <nav className={styles.container}>
            <Button
                dark = {true}
                lightText = {true}
            >
                Sign out
            </Button>
        </nav>
    );
};

export default Nav;
