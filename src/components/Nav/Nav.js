import React from 'react';
import styles from './Nav.module.css';
import Button from '../UI/Button/Button';

const Nav = (props) => {
    return(
        <nav className={styles.container}>
            {props.signedIn ?
                <Button
                    classes='dark lightText'
                    click={()=>props.onRouteChange('signin')}
                >
                    Sign out
                </Button> :
                <React.Fragment>
                    <Button
                        classes='dark lightText marginRight'
                        click={()=>props.onRouteChange('signin')}
                    >
                        Sign in
                    </Button>
                    <Button
                        classes='dark justFrame'
                        click={()=>props.onRouteChange('register')}
                    >
                        Register
                    </Button>
                </React.Fragment>
            }
        </nav>
    );
};

export default Nav;
