import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Container from './components/Container'
import LoginForm from './components/LoginForm'

class App extends Component {

  state = {
    currentUser: {}
  }

  setCurrentUser = (newUser) => {
    this.setState({currentUser: newUser})
  }

  render() {
    console.log(this.state, 'from App')
    return (
      <div className="App">
        <NavBar />
        <LoginForm setCurrentUser={this.setCurrentUser}/>
        <Container />
      </div>
    );
  }
}

export default App;
