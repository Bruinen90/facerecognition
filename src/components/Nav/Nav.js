import React from 'react';
import styles from './Nav.module.css';
import Button from '../UI/Button/Button';

const Nav = (props) => {
    return(
        <nav className={styles.container}>
            <Button
                classes='dark lightText'
                click={()=>props.onRouteChange('signin')}
            >
                Sign out
            </Button>
        </nav>
    );
};

export default Nav;
