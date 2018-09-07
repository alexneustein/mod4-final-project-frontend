import React from 'react';
import { ActionCable } from 'react-actioncable-provider'

export default class Cables extends React.Component{

  state = {
    response: ''
  }



  onReceived = (e) => {
    console.log(e)

  }

  sendMessage = () => {
    console.log(this.refs)

    const message = this.refs.newMessage.value
    this.refs.ChatChannel.perform('onChat', {message})

  }

  // componentDidMount(){
  //
  // }

  render(){
    console.log(this.subscription)
    return(
      <div>
      <ActionCable
        ref='ChatChannel'
        channel={{channel: 'ChatChannel'}}
        onReceived={(e) => console.log(e)}
        onReceived={this.onReceived}
       />
       <p>{this.state.response}</p>
        <input ref='newMessage' type='text' />
        <button onClick={this.sendMessage}>Send</button>
        </div>
    );
  }
}
