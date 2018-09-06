import React,  { Component } from 'react'
import GameContainer from './GameContainer'
import MessagesContainer from './MessagesContainer'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

export default class Container extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper><GameContainer /></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper><MessagesContainer /></Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
