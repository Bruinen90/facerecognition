import React from 'react';
import styles from './Rank.module.css';

const Rank = (props) => {
    return(
        <div className={styles.container}>
            Your current rank is
            <h2 className={styles.rank}>
                #2
            </h2>
        </div>
    );
};

export default Rank;
