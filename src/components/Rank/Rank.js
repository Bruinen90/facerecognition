import React from 'react';
import styles from './Rank.module.css';

const Rank = (props) => {
    return(
        <div className={styles.container}>
            {props.username}, you have detected
            <h2 className={styles.rank}>
                {props.detections} faces
            </h2>
        </div>
    );
};

export default Rank;
