import React,  { Component } from 'react'

import Message from './Message'

export default class MessagesContainer extends Component {
  render() {
    return (
      <div>
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
    )
  }
}
