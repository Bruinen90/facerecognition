import React from 'react';
import styles from './Register.module.css';

import Form from '../UI/Form/Form';
import Header from '../UI/Header/Header';
import TextInput from '../UI/TextInput/TextInput';
import Button from '../UI/Button/Button';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            re_password: '',
        }
    }

    onInputChange = (e, stateObjToUpdate) => {
        this.setState({[stateObjToUpdate]: e.target.value})
    }

    onClickRegister = () => {
        fetch('https://murmuring-beach-74234.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home')
                } else {
                    console.log('error')
                }
            })
    }

    render() {
        return(
            <Form>
                <Header>
                    Register
                </Header>
                <TextInput
                    name='username'
                    type='text'
                    labelText='Username'
                    onChange={(e) => this.onInputChange(e, 'username')}
                />
                <TextInput
                    name='email'
                    type='email'
                    labelText='Your email address'
                    onChange={(e) => this.onInputChange(e, 'email')}
                />
                <TextInput
                    name='password'
                    type='password'
                    labelText='Password'
                    onChange={(e) => this.onInputChange(e, 'password')}
                />
                <TextInput
                    name='re_password'
                    type='password'
                    labelText='Repeat password'
                    onChange={(e) => this.onInputChange(e, 're_password')}
                />
                <div className={styles.buttonsCont}>
                    <Button
                        classes='dark lightText fullWidth'
                        click={()=>this.onClickRegister()}
                    >
                        Create account
                    </Button>
                    <Button
                        classes='dark justFrame fullWidth topMargin'
                        click={()=>this.props.onRouteChange('signin')}
                    >
                        Sign in
                    </Button>
                </div>
            </Form>
        );
    }
};

export default Register;
