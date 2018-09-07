import React,  { Component } from 'react'

import Cables from './Cables'

import Message from './Message'

export default class MessagesContainer extends Component {

  state = {
    messages: []
  }

  createMessage = (message) => {
    console.log(message)
    this.setState(prevState => ({
      messages: [...prevState.messages, message]
    }))
  }

  render() {
    return (
      <div>
        <div style={{overflow: 'scroll', height: 100, position: 'relative'}}>
        {this.state.messages.map((messageBody, i) => [
          <Message key={i} content={messageBody} currentUser={this.props.currentUser} />
        ])}
      </div>
        <Cables createMessage={this.createMessage} currentUser={this.props.currentUser}/>

      </div>
    )
  }
}
