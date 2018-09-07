import React,  { Component } from 'react'

const Message = (props) => {
  return (
    <p>{props.content.user.username} {props.content.message}</p>
  )
}

export default Message
