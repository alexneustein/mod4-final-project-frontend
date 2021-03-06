import React, { Component, Fragment } from 'react';
// import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Container from './components/Container'
import LoginForm from './components/LoginForm'
// import Cables from './components/Cables'
// import Grid from '@material-ui/core/Grid'

import {Route, Switch, Redirect} from 'react-router-dom'

const RAILS_URL = "http://10.39.107.135:3000"

class App extends Component {
  // username: 'peterthegeek', id: 1

  state = {
    // currentUser: {}
    // currentUser: {username: 'peterthegeek', id: 1},
    currentUser: {username: 'dan', id: 2},
    // messages: []
  }

  componentDidMount(){
  }

  logOut = () => {
    this.setState({currentUser: {}})
  }

  setCurrentUser = (newUser) => {
    const bodyObj = {...newUser}
    return fetch(`${RAILS_URL}/login`, {
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

  signUpUser = (newUser) => {
    const bodyObj = {...newUser}
    return fetch(`${RAILS_URL}/players`, {
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
    // console.log(this.state)
    // const loggedIn = !!this.state.currentUser.id
    const loggedIn = true
    return (
      <div className="App">
        <Fragment>
          <NavBar currentUser={this.state.currentUser} loggedIn={ loggedIn } logOut={this.logOut} setCurrentUser={this.setCurrentUser}/>
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/gameon' /> } />
              <Route exact path='/gameon' render={props => <Container currentUser={this.state.currentUser} loggedIn={ loggedIn } {...props}/> }/>
              <Route exact path='/login' render={props => <LoginForm setCurrentUser={this.setCurrentUser} loggedIn={ loggedIn } signUpUser={this.signUpUser} {...props} /> } />
              <Route render={()=> <Redirect to='/login'/> }/>
            </Switch>
        </Fragment>
      </div>
    );
  }
}

export default App;
