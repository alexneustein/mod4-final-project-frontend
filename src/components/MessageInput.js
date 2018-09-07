import React,  { Component } from 'react'

import TextField from '@material-ui/core/TextField';

const MessageInput = (props) => {
  return (
    <div id="message-input">
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
          // placeholder="Placeholder"
          // helperText="Full width!"
          fullWidth
          margin="normal"
        />
        <button type='submit'>Submit Guess</button>
      </form>
    </div>
  )
}

export default MessageInput
