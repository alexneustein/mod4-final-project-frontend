import React from 'react';

export default class LoginForm extends React.Component{

  state = {
    username: '',
    password_digest: ''
  }

  handleChange = (e) => {
    const inputValue = e.target.value
    this.setState({[e.target.name]: inputValue})
  }

  handleclick = (e) => {
    e.preventDefault()
    this.props.setCurrentUser(this.state)
  }

  render () {
    // console.log(this.state)
    return(
          <form onSubmit={this.handleclick}>
            <label>Username</label>
            <input name='username' value={this.state.username} type='text' placeholder='Username' onChange={this.handleChange}/>
            <label>Password</label>
            <input name='password_digest' value={this.state.password_digest}type='password' placeholder='Password' onChange={this.handleChange} />
            <button type='submit'>Submit</button>
          </form>
    )
  }
}
