import React from 'react';
import styles from './SignIn.module.css';

import Button from '../UI/Button/Button';

const SignIn = (props) => {
    return(
        <div className={styles.container}>
            <form className={styles.form}>
                <h2 className={styles.header}>
                    Sign In
                </h2>
                <div className={styles.row}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" />
                </div>
                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <div className={styles.bottomRow}>
                    <div className={styles.buttonCont}>
                        <Button
                            classes='dark lightText'
                            click={()=>props.onRouteChange('home')}
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className={styles.buttonCont}>
                        <Button classes='dark justFrame'>
                            Register
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
