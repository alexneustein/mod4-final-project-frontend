import React,  { Component } from 'react'
import MessageCard from '../MaterialComponents/MessageCard'
import OtherMessageCard from '../MaterialComponents/OtherMessageCard'

const Message = (props) => {
  console.log(props.content.user.username.includes('Guess'))
  return (
    <div>
    {props.content.user.username.includes(props.currentUser.username) ?
      <MessageCard currentUser={props.currentUser} user={props.content.user} message={props.content.message}/>
      :
      <OtherMessageCard currentUser={props.currentUser} user={props.content.user} message={props.content.message}/>
    }
  </div>
  )
}

export default Message
