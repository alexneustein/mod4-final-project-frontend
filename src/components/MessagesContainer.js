import React,  { Component } from 'react'

import Cables from './Cables'

import Message from './Message'

export default class MessagesContainer extends Component {

  // state = {
  //   messages: []
  // }
  //
  // createMessage = (message) => {
  //   console.log(message)
  //   this.setState(prevState => ({
  //     messages: [...prevState.messages, message]
  //   }))
  // }

  render() {
    return (
      <div>
        <h1>Messages</h1>
        <div className='chat-box'>
        {this.props.messages.map((messageBody, i) => [
          <Message key={i} content={messageBody} currentUser={this.props.currentUser} />
        ])}
      </div>
        <Cables createMessage={this.props.createMessage} currentUser={this.props.currentUser}/>
      </div>
    )
  }
}
