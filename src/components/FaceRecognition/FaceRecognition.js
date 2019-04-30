import React from 'react';
import styles from './FaceRecognition.module.css';

const FaceRecognition = (props) => {
    return(
        <div className={styles.container}>
            <img
                src={props.imgUrl}
                alt=""
                className={styles.image}
            />
        </div>
    );
};

export default FaceRecognition;
