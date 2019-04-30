import React from 'react';
import styles from './Logo.module.css';
import Tilt from 'react-tilt';
import logo from '../../img/logo.svg';

const Logo = (props) => {
    return(
        <div className={styles.container}>
            <Tilt
                className={styles.logo}
                options={{ max : 50 }}
            >
                <div className="Tilt-inner">
                    <img src={logo} alt="Logo" className={styles.logo}/>
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
