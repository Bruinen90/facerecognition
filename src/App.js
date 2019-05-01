import React from 'react';
import styles from './App.module.css';

import Nav from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
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
        this.setState({route: target})
    }


    render() {
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
                />
                <Logo />
                <div className={styles.mainCont}>
                    {this.state.route === 'signin' ?
                        <SignIn
                            onRouteChange={(target)=>this.onRouteChange(target)}
                        />
                        :
                        <React.Fragment>
                            <Rank />
                            <ImageLinkForm
                                onChangeInput={this.onInputChange}
                                onClickSubmit={this.onClickSubmit}
                            />
                            <FaceRecognition
                                imgUrl = {this.state.input}
                                boxes = {this.state.boxes}
                            />
                        </React.Fragment>
                    }
                </div>
            </div>
        );
    }
}

export default App;
