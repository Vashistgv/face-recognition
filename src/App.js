import React from 'react';
import Navigation from './components/navigation/Navigation'
import './App.css';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './SignIn/SignIn';
import Register from './components/Register/Register';






const paramsP =
{
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
  }
loadUser = (data) => {
this.setState({
  user : {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }
})
}
  

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  catchImageBound = (data) => {
    const clarifaiImg = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('imageurl')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      left_col: clarifaiImg.left_col * width,
      top_col: clarifaiImg.top_row * height,
      right_col: width - (clarifaiImg.right_col * width),
      bottom_col: height - (clarifaiImg.bottom_row * height)
    }
  }


  displayBox = (box) => {
    this.setState({ box: box })
  }

  onButtonSubmit = () => {

    this.setState({ imageUrl: this.state.input })

    fetch('https://immense-depths-26922.herokuapp.com/imageUrl' , {
              method : 'post',
              headers : {'content-type' : 'application/json'} ,
              body : JSON.stringify({
                  input : this.state.input
              }) }
              )
              .then(response => response.json())
      .then(response =>  {
             fetch('https://immense-depths-26922.herokuapp.com/image' , {
              method : 'put',
              headers : {'content-type' : 'application/json'} ,
              body : JSON.stringify({
                  id: this.state.user.id
              }) }
              )
              .then(res => res.json())
              .then(count => {
                console.log("this" , count)
                this.setState(Object.assign(this.state.user , {entries : count}))
                this.displayBox(this.catchImageBound(response))
              })
        
      } )
      .catch(err => console.log(err))

  // })
}


  onRouteChange = (route) => {

    if (route === 'home') {
      this.setState({ isSignedIn: true })
    } else {
      this.setState(initialState)
    }
    this.setState({ route: route })
  }
  render() {
    return (
      <div className="App">
        <Particles
          className='particles'
          params={paramsP} />

        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} /> {
          this.state.route === 'home' ?
            <div>
              <Logo />

              <Rank name={this.state.user.name} rank={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
            </div> : (
              this.state.route === 'signin' ?
                <SignIn 
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
                /> :

                <Register 
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} />
            )


        }

      </div>
    )
  }

}
export default App;
