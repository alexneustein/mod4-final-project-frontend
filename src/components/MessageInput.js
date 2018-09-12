import React,  { Component } from 'react'
import Button from '../MaterialComponents/Button'

import TextField from '@material-ui/core/TextField';

const MessageInput = (props) => {
  return (
    <div id="message-input">
        <h2>{props.answer}</h2>
      <form onSubmit={props.setScore}>
      <TextField
          id="full-width"
          label="Guess!"
          name='guess'
          onChange={props.inputChange}
          InputLabelProps={{
            shrink: true,
          }}
          value={props.controlField}
          fullWidth
          margin="normal"
        />
        <Button type='submit' color='primary' buttonText='Guess'/>
      </form>
      {/* {
        props.currentUser.id === props.performer?
        <h2>{props.answer}</h2>
      :
      <form onSubmit={props.setScore}>
      <TextField
          id="full-width"
          label="Guess!"
          name='guess'
          onChange={props.inputChange}
          InputLabelProps={{
            shrink: true,
          }}
          value={props.controlField}
          fullWidth
          margin="normal"
        />
        <Button type='submit' color='primary' buttonText='Guess'/>
      </form>

    } */}

    </div>
  )
}

export default MessageInput
