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

  render () {
    // console.log(this.state)
    return(
          <form onSubmit={this.handleclick}>
            <label>Username</label>
            <input name='username' value={this.state.username} type='text' placeholder='Username' onChange={this.handleChange}/>
            <label>Password</label>
            <input name='password' value={this.state.password} type='password' placeholder='Password' onChange={this.handleChange} />
            <button type='submit'>Submit</button>
          </form>
    )
  }
}
