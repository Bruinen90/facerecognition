import React from 'react';
import styles from './FaceRecognition.module.css';

const FaceRecognition = (props) => {
    const frames = props.boxes.map((box, index) => (
        <div
            className={styles.box}
            style={{
                left: `${box.left_col*100}%`,
                top: `${box.top_row*100}%`,
                right: `${100 - box.right_col*100}%`,
                bottom: `${100 - box.bottom_row*100}%`,
            }}
            key = {index}
        ></div>
    ))
    return(
        <div className={styles.container}>
            <img
                src={props.imgUrl}
                alt=""
                className={styles.image}
            />
            {frames}
        </div>
    );
};

export default FaceRecognition;
