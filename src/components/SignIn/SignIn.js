import React from 'react';
import styles from './SignIn.module.css';

import Form from '../UI/Form/Form';
import Header from '../UI/Header/Header';
import TextInput from '../UI/TextInput/TextInput';
import Button from '../UI/Button/Button';
import ErrorPrompt from '../UI/ErrorPrompt/ErrorPrompt';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errorLogin: false,
        }
    }

    onEmailChange = (e) => {
        this.setState({signInEmail: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({signInPassword: e.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://murmuring-beach-74234.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if(user.id) {
                    this.props.loadUser(user)
                    this.props.onSignIn('home')
                } else {
                    this.setState({ errorLogin: true })
                }
            })
    }

    render() {
        return(
            <Form>
                <Header>
                    Sign In
                </Header>
                <div className={styles.inputsCont}>
                    <TextInput
                        name='email'
                        type='email'
                        labelText='Email address'
                        onChange={(e)=>this.onEmailChange(e)}
                    />
                    <TextInput
                        name='password'
                        type='password'
                        labelText='Password'
                        onChange={(e)=>this.onPasswordChange(e)}
                    />
                    {
                        this.state.errorLogin &&
                        <ErrorPrompt
                            message='Incorrect email or password'
                        />
                    }
                </div>
                <div className={styles.bottomRow}>
                    <div className={styles.buttonCont}>
                        <Button
                            classes='dark lightText'
                            click={()=>this.onSubmitSignIn()}
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className={styles.buttonCont}>
                        <Button
                            classes='dark justFrame'
                            click={()=>this.props.onClickRegister('register')}
                        >
                            Register
                        </Button>
                    </div>
                    </div>
            </Form>
        );
    }
};

export default SignIn;
