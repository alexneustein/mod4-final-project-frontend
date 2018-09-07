import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Container from './components/Container'
import LoginForm from './components/LoginForm'
import Cables from './components/Cables'

class App extends Component {

  state = {
    currentUser: {},
    messages: []
  }

  setCurrentUser = (newUser) => {
    const bodyObj = {...newUser}
    return fetch('http://localhost:3000/players', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyObj)
    })
    .then(r=>r.json())
    // .then(console.log)
    .then(resp => {
      this.setState({
        currentUser: resp
      })
    })

  }

  updateMessages = (e) => {
    console.log(e)
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div className="App">
        <NavBar currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser}/>
        <Container currentUser={this.state.currentUser}/>
      </div>
    );
  }
}

export default App;
