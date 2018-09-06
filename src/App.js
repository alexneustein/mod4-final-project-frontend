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

  render() {
    console.log(this.state, 'from app')
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
