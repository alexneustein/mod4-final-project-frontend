import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'

import GameContainer from './GameContainer'
import MessagesContainer from './MessagesContainer'
import AuthWrapper from '../hoc/authWrapper'

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class Container extends Component {

  state = {
    user: {},
    message: '',
    messages: [],
    topics: []
  }


  componentDidMount(){
    fetch('http://localhost:3000/topics')
      .then(r=>r.json())
      .then(resp => {
        this.setState({
          topics: resp
        })
      }
      )
    this.setState({user: this.props.currentUser})


  }

  onReceived = (e) => {
    // console.log('onReceived', e)
    if(e.message.message){
      this.createMessage(e.message.message)
    } else {
      this.createMessage(e)
    }
  }

  createMessage = (message) => {
    // console.log('createMessage', message)
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }))
  }

  sendMessage = (userobject) => {

    const postUser = () => {
      if(this.props.currentUser.username){
        return this.props.currentUser
      } else {
        return {username: `Anonymous`}
      }
    }

    if(userobject.user){
      this.refs.ChatChannel.perform('onChat', {userobject})
    } else {
      const postMessage = this.state.message
      const message = {user: postUser(), message: postMessage}
      this.refs.ChatChannel.perform('onChat', {message})
      this.setState({message: ''})
    }

  }

  handleInput = (event) => {

  console.log(event)
    if(event.keyCode == 13){
      this.sendMessage()
    }

    if(event.message){
      this.setState(event)
    } else {
    const value = event.target.value
    // console.log('handleInput', value)
    this.setState({message: value})
  }
  }

  render() {
    return (
      <div>
        <ActionCable
          ref='ChatChannel'
          channel={{channel: 'ChatChannel'}}
          onReceived={this.onReceived}
         />
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper><GameContainer topics={this.state.topics} createMessage={this.createMessage} currentUser={this.props.currentUser} sendMessage={this.sendMessage} handleInput={this.handleInput}/></Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper><MessagesContainer onReceived={this.onReceived} messageValue={this.state.message} sendMessage={this.sendMessage} handleInput={this.handleInput} createMessage={this.createMessage} messages={this.state.messages} currentUser={this.props.currentUser}/></Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default AuthWrapper(Container)
