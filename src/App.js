import React from 'react';
import styles from './App.module.css';

import Nav from './components/Nav/Nav';
import Logo from './components/Logo/Logo';
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
        }
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onClickSubmit = () => {
        console.log(this.state.input)
        this.setState({imgUrl: this.state.input})
        app.models.predict(
            Clarifai.FACE_DETECT_MODEL,
            this.state.input)
            .then(
                function(response) {
                  console.log(response.outputs[0].data.regions)
                },
                function(err) {
                  console.log(err)
                }
  );

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
                <Nav />
                <Logo />
                <div className={styles.mainCont}>
                    <Rank />
                    <ImageLinkForm
                        onChangeInput={this.onInputChange}
                        onClickSubmit={this.onClickSubmit}
                    />
                    <FaceRecognition
                        imgUrl = {this.state.input}
                    />
                </div>
            </div>
        );
    }
}

export default App;
