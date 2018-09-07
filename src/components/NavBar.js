import React,  { Component } from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginForm from './LoginForm'

const NavBar = (props) => {
  console.log(props.currentUser)
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Some Kind Of Game With Pictures and Videos and Audios
          </Typography>
          <div align='right'>
          {props.currentUser.username
            ? <Typography variant="title" color='inherit' align='right'>
                {props.currentUser.username}
              </Typography>
            : <LoginForm setCurrentUser={props.setCurrentUser}/>}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
