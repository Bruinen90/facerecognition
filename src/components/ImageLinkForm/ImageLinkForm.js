import React from 'react';
import styles from './ImageLinkForm.module.css';
import Button from '../UI/Button/Button';

const ImageLinkForm = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.form}>
                <input
                    type="text"
                    className={styles.urlInput}
                    placeholder="Your image url address"
                    onChange={props.onChangeInput}
                    value={props.inputValue}
                />
                <Button
                    classes='red lightText bold'
                    click={props.onClickSubmit}
                >
                    Detect faces
                </Button>

            </div>
        </div>
    );
};

export default ImageLinkForm;
