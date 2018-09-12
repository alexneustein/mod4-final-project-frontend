import React from 'react'

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import LoginForm from './LoginForm'
import TopNavBar from '../MaterialComponents/TopNavBar'

const NavBar = (props) => {
  // console.log(props.currentUser)
  return (
    <TopNavBar currentUser={props.currentUser}/>
  )
}

export default NavBar
