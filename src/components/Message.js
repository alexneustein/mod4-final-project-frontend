import React,  { Component } from 'react'
import MessageCard from '../MaterialComponents/MessageCard'

const Message = (props) => {
  return (
    <MessageCard currentUser={props.currentUser} user={props.content.user} message={props.content.message}/>
  )
}

export default Message
