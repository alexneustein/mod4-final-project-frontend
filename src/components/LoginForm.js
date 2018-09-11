import React from 'react';
import { Link, Redirect } from 'react-router-dom'


export default class LoginForm extends React.Component{

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    const inputValue = e.target.value
    this.setState({[e.target.name]: inputValue})
  }

  handleclick = (e) => {
    e.preventDefault()
    this.props.setCurrentUser({player: {...this.state}})
  }

  onOtherClick =(e) => {
    console.log(this.state)
    this.props.signUpUser({player: {...this.state}})
  }

  render () {
    if (this.props.loggedIn){
      return <Redirect to='/gameon'/>
    } else {
      return(
          <div>
            <form onSubmit={this.handleclick}>
              <label>Username</label>
              <input name='username' value={this.state.username} type='text' placeholder='Username' onChange={this.handleChange}/>
              <label>Password</label>
              <input name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
              <button id='login' type='submit'>Log In</button>
            </form>
            <button id='sign up' onClick={this.onOtherClick}>Sign Up</button>
          </div>
      )
    }
  }
}
