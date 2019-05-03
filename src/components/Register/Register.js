import React from 'react';
import styles from './Register.module.css';

import Form from '../UI/Form/Form';
import Header from '../UI/Header/Header';
import TextInput from '../UI/TextInput/TextInput';
import Button from '../UI/Button/Button';

const Register = (props) => {
    return(
        <Form>
            <Header>
                Register
            </Header>
            <TextInput
                name='username'
                type='text'
                labelText='Username'
            />
            <TextInput
                name='email'
                type='email'
                labelText='Your email address'
            />
            <TextInput
                name='password'
                type='password'
                labelText='Password'
            />
            <TextInput
                name='re_password'
                type='password'
                labelText='Repeat password'
            />
            <div className={styles.buttonsCont}>
                <Button classes='dark lightText fullWidth'>
                    Create account
                </Button>
                <Button
                    classes='dark justFrame fullWidth topMargin'
                    click={()=>props.onClickSignIn('signin')}
                >
                    Sign in
                </Button>
            </div>
        </Form>
    );
};

export default Register;
