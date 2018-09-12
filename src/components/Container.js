import React,  { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GameContainer from './GameContainer'
import MessagesContainer from './MessagesContainer'
import AuthWrapper from '../hoc/authWrapper'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Container extends Component {

  state = {
    messages: []
  }

  createMessage = (message) => {
    console.log(message)
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }))
  }

// componentDidMount(){
//   fetch('http://localhost:3000/players').then(r=>r.json())
// }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper><GameContainer createMessage={this.createMessage} currentUser={this.props.currentUser}/></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper><MessagesContainer createMessage={this.createMessage} messages={this.state.messages} currentUser={this.props.currentUser}/></Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default AuthWrapper(Container)
