import React,  { Component } from 'react'
import GameContainer from './GameContainer'
import MessagesContainer from './MessagesContainer'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class Container extends Component {

// componentDidMount(){
//   fetch('http://localhost:3000/players').then(r=>r.json())
// }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper><GameContainer currentUser={this.props.currentUser}/></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper><MessagesContainer currentUser={this.props.currentUser}/></Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
