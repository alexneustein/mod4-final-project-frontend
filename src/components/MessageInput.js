import React,  { Component } from 'react'

import TextField from '@material-ui/core/TextField';

const MessageInput = () => {
  return (
    <div id="message-input">
      <TextField
          id="full-width"
          label="Guess!"
          InputLabelProps={{
            shrink: true,
          }}
          // placeholder="Placeholder"
          // helperText="Full width!"
          fullWidth
          margin="normal"
        />
    </div>
  )
}

export default MessageInput
