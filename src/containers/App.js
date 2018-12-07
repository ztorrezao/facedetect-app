import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navegation from '../components/Navegation/Navegation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import RankText from '../components/RankText/RankText';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import './App.css';

const initialState = {
    input: '',
    imageURL: '',
    boxes: [],
    route: 'login',
    isLoggedin: false,
    user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
    }
};

// Particles js options
const particlesParam = {
    particles: {
        "number": {
            "value": 162,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        }
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = initialState;
    }

    calculateFaceLocation = (data) => {
        const boxes = data.map(img => {
            const clarifaiFaceImage = img.region_info.bounding_box;

            const image = document.getElementById('scnImage');
            const width = Number(image.width);
            const height = Number(image.height);

            return {
                top: clarifaiFaceImage.top_row * height,
                left: clarifaiFaceImage.left_col * width,
                right: width - (clarifaiFaceImage.right_col * width),
                bottom: height - (clarifaiFaceImage.bottom_row * height)
            }
        });
        return boxes;
    }

    displayFaceBox = (boxes) => {
        return this.setState({boxes})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonClick = () => {
        let img = document.getElementById('scnImage');
        this.setState({
            image: img
        })
        this.setState({
            imageURL: this.state.input
        });
        
        fetch('http://localhost:3001/imageapi', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    input: this.state.input
            })})
            .then(response => response.json())
            .then(data => {
                if (data.outputs[0]) {
                    this.onEntriesUpdate();
                }
                const regions = data.outputs[0].data.regions;
                this.displayFaceBox(this.calculateFaceLocation(regions));
            })
            .catch(err => console.log(err));
    }

    onEntriesUpdate = () => {
        fetch('http://localhost:3001/image', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    id: this.state.user.id
                })
            })
            .then(res => res.json())
            .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(err => console.log(err));
    }

    onRouteChange = (route) => {
        if (route === 'login') {
            this.setState(initialState);
        }
        this.setState({
            route
        });
    }

    updateUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    render() {
        const route = this.state.route;
        switch(route){
            case 'login':
                return (
                    <div className={`App`}>
                        <Particles params={particlesParam} className="particle"/>
                        <Navegation route={this.state.route} onRouteChange={this.onRouteChange}/>
                        <LoginForm updateUser={this.updateUser} onRouteChange={this.onRouteChange}/>
                    </div>
                    );
            case 'register':
                return (
                        <div className="App">
                            <Particles params={particlesParam} className="particle"/>
                            <Navegation route={ this.state.route } onRouteChange={this.onRouteChange}/>
                            <RegisterForm updateUser={this.updateUser} onRouteChange={this.onRouteChange}/>
                        </div>
                    );
            case 'home':
                return (
                        <div className="App">
                            <Particles params={particlesParam} className="particle"/>
                            <Navegation route={ this.state.route } onRouteChange={this.onRouteChange}/>
                            <Logo />
                            <RankText name={this.state.user.name} entries={this.state.user.entries}/>
                            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} />
                            <FaceRecognition imageURL={this.state.imageURL} boxes={this.state.boxes} /> 
                        </div>
                    );
            default:
                return (
                        <div className="App h-100">
                            <Particles params={particlesParam} className="particle"/>
                            <div className='bg-white pa3 ma2 shadow-2'>
                                <h3 className='f3'>Nothing to load...</h3>
                            </div>
                        </div>
                    );
        }
    }
}

export default App;
