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
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '440f2609d58f49fb9e3fbd0e9d32e68d'
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imgUrl: '',
            boxes: [],
            route: 'signin',
            signedIn: false,
        }
    }

    calculateFaceLocation = (input) => {
        console.log(input.outputs[0].data.regions[0].region_info.bounding_box);
        const boxes = input.outputs[0].data.regions.map(region => (
            region.region_info.bounding_box
        ));
        this.setState({boxes: boxes})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onClickSubmit = () => {
        this.setState({imgUrl: this.state.input})
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(response => this.calculateFaceLocation(response))
            .catch(err => console.log(err))
    }

    onRouteChange = (target) => {
        if(target === 'signin') {
            this.setState({signedIn: false})
        } else if(target === 'home') {
            this.setState({signedIn: true})
        }
        this.setState({route: target})
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
                            <Rank />
                            <ImageLinkForm
                                onChangeInput={this.onInputChange}
                                onClickSubmit={this.onClickSubmit}
                            />
                            <FaceRecognition
                                imgUrl = {input}
                                boxes = {boxes}
                            />
                        </React.Fragment> :
                        (
                            route === 'signin' ?
                            <SignIn
                                onSignIn={(target)=>this.onRouteChange(target)}
                                onClickRegister={(target)=>this.onRouteChange(target)}
                            /> :
                            <Register
                                onClickSignIn={(target)=>this.onRouteChange(target)}
                            />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
