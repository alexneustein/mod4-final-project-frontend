import React,  { Component } from 'react'

const Message = (props) => {
  return (
    <div className='chat-messages'>
    <p>{props.content.user.username} {props.content.message}</p>
   </div>
  )
}

export default Message
