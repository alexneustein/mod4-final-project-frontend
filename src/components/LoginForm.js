import React from 'react';

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
    this.props.setCurrentUser(this.state)
    this.setState({username: '', password: ''})
  }

  render () {
    console.log(this.state, 'From Form')
    return(
          <form onSubmit={this.handleclick}>
            <label>Username</label>
            <input name='username' type='text' placeholder='Username' onChange={this.handleChange}/>
            <label>Password</label>
            <input name='password' type='password' placeholder='Password' onChange={this.handleChange} />
            <button type='submit'>Submit</button>
          </form>
    )
  }
}
