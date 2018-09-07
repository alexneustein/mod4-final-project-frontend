import React from 'react';
import { ActionCable } from 'react-actioncable-provider'

export default class Cables extends React.Component{

  state = {
    user: {},
    message: ''
  }
  componentDidMount(){
    this.setState({user: this.props.currentUser})
  }



  onReceived = (e) => {
    this.props.createMessage(e.message.message)
  }

  sendMessage = () => {
    const message = {user: this.props.currentUser, message: this.refs.newMessage.value}
    this.refs.ChatChannel.perform('onChat', {message})
    this.setState({message: ''})
  }


  handleInput = (event) => {
    const value = event.target.value
    this.setState({message: value})
  }

  render(){
    return(
      <div>
      <ActionCable
        ref='ChatChannel'
        channel={{channel: 'ChatChannel'}}
        onReceived={this.onReceived}
       />
        <input ref='newMessage' type='text' onChange={this.handleInput} value={this.state.message}/>
        <button onClick={this.sendMessage}>Send</button>
        </div>
    );
  }
}
