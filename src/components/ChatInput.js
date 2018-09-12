import React from 'react';
import Button from '../MaterialComponents/Button'
import InputField from '../MaterialComponents/InputField'
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

export default class ChatInput extends React.Component{

  render () {
    return (
        <div>
          <InputField name='Message' placeholder='Type your message here...' type='text' value={this.props.messageValue} onChange={this.props.handleInput}/>
          <Button onClick={this.props.sendMessage} color='default' buttonText='Send'/>
        </div>
    )
  }
}
