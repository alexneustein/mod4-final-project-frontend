import React,  { Component } from 'react'
import MessageCard from '../MaterialComponents/MessageCard'
import OtherMessageCard from '../MaterialComponents/OtherMessageCard'

const Message = (props) => {
  console.log('message function', props)
  if(props.content.message.userobject){
      return (
        <div>
      {props.content.message.userobject.user.username.includes(props.currentUser.username) ?
      <MessageCard currentUser={props.currentUser} user={props.content.message.userobject.user} message={props.content.message.userobject.message}/>
      :
      <OtherMessageCard currentUser={props.currentUser} user={props.content.message.userobject.user} message={props.content.message.userobject.message}/>
    }
  </div>
  )
} else {
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
}

export default Message
