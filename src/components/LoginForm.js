import React from 'react';
import { Redirect } from 'react-router-dom'
import InputField from '../MaterialComponents/InputField'
import MyButton from '../MaterialComponents/Button'
import LoginCard from '../MaterialComponents/LoginCard'
// import Grid from '@material-ui/core/Grid'



export default class LoginForm extends React.Component{

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    const inputValue = e.target.value
    this.setState({[e.target.name]: inputValue})
  }

  handleEnter = (e) => {
    if(e.key === 'Enter'){
      this.handleclick(e)
    }
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
      return <Redirect to='/gameon#1'/>
    } else {
      return(
        <div>
          <LoginCard
            inputUser={() => <InputField name='username' handleEnter={this.handleEnter} placeholder='username' type='text' value={this.state.username} onChange={this.handleChange}/>}
            inputPassword={() => <InputField name='password' handleEnter={this.handleEnter} placeholder='password' type='password' value={this.state.password} onChange={this.handleChange}/>}
            loginButton={()=>    <MyButton id='Login' color='primary' onClick={this.handleclick} buttonText='Log In'/>}
            signupButton={()=>   <MyButton id='signup' color='secondary' onClick={this.onOtherClick} buttonText='Sign Up'/>}
          />

          {/* <LoginCard
            inputUser={() => <InputField name='username' placeholder='username' type='text' value={this.state.username} onChange={this.handleChange}/>}
            inputPassword={() => <InputField name='password' placeholder='password' type='password' value={this.state.password} onChange={this.handleChange}/>}
            loginButton={()=>    <MyButton id='Login' color='primary' onClick={this.handleclick} buttonText='Log In'/>}
            signupButton={()=>   <MyButton id='signup' color='secondary' onClick={this.onOtherClick} buttonText='Sign Up'/>}
          /> */}
{/*
          <InputField name='username' placeholder='username' type='text' value={this.state.username} onChange={this.handleChange}/>
          <InputField name='password' placeholder='password' type='password' value={this.state.password} onChange={this.handleChange}/>
        </form>

        <MyButton id='Login' color='primary' onClick={this.handleclick} buttonText='Log In'/>
        <MyButton id='signup' color='secondary' onClick={this.onOtherClick} buttonText='Sign Up'/> */}
        </div>

      )
    }
  }
}
