import React from 'react';
import styles from './App.module.css';

import Nav from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Particles from 'react-particles-js';

const initialState = {
    input: '',
    inputValue: '',
    imgUrl: '',
    boxes: [],
    route: 'signin',
    signedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    }
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            inputValue: '',
            imgUrl: '',
            boxes: [],
            route: 'signin',
            signedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: '',
            }
        }
    }

    calculateFaceLocation = (input) => {
        const boxes = input.outputs[0].data.regions.map(region => (
            region.region_info.bounding_box
        ));
        this.setState({boxes: boxes})
    }

    onInputChange = (event) => {
        this.setState({
            input: event.target.value,
            inputValue: event.target.value,
            boxes: [],
        });
    }

    onClickSubmit = () => {
        this.setState({imgUrl: this.state.input});
            fetch('https://murmuring-beach-74234.herokuapp.com/imageurl', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  input: this.state.input
                })
            })
            .then(response => response.json())
            .then(response => {
            if (response) {
                fetch('https://murmuring-beach-74234.herokuapp.com/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      id: this.state.user.id,
                      facesCount: response.outputs[0].data.regions.length
                    })
                })
                    .then(response => response.json())
                    .then(count => {
                        this.setState({
                            inputValue: '',
                            user: {
                                ...this.state.user,
                                entries: count,
                            }
                        })
                    })
                    .catch(console.log)
                }
                this.calculateFaceLocation(response);

            })
            .catch(err => console.log(err))
    }

    onRouteChange = (target) => {
        if(target === 'signin') {
            this.setState(initialState)
        } else if(target === 'home') {
            this.setState({signedIn: true})
        }
        this.setState({
            route: target,
        })
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.username,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            }
        })
    }


    render() {
        const { input, boxes, route, signedIn } = this.state;
        return (
            <div className={styles.container}>
                <Particles
                    className={styles.particles}
                    params={
                        {particles: {
                            number: {
                                value: 120,
                                density: {
                                    enable: true,
                                    value_area: 600,
                                }
                            }
                        }}
                    }
                />
                <Nav
                    onRouteChange={(target)=>this.onRouteChange(target)}
                    signedIn={signedIn}
                />
                <Logo />
                <div className={styles.mainCont}>
                    {route === 'home' ?
                        <React.Fragment>
                            <Rank
                                detections = {this.state.user.entries}
                            />
                            <ImageLinkForm
                                onChangeInput={this.onInputChange}
                                onClickSubmit={this.onClickSubmit}
                                inputValue={this.state.inputValue}
                            />
                            <FaceRecognition
                                imgUrl = {input}
                                boxes = {boxes}
                            />
                        </React.Fragment> :
                        (
                            route === 'signin' ?
                            <SignIn
                                loadUser = {this.loadUser}
                                onSignIn={this.onRouteChange}
                                onClickRegister={this.onRouteChange}
                            /> :
                            <Register
                                onRouteChange={this.onRouteChange}
                                loadUser = {this.loadUser}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
