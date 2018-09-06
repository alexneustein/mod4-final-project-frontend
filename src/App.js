import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Container from './components/Container'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Container />
      </div>
    );
  }
}

export default App;
