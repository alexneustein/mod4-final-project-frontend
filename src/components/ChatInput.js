import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

export default class ChatInput extends React.Component{

  // const classes = this.props

  render () {
    return (
        <div>
          <input type='text' onChange={this.props.handleInput} value={this.props.value}/>
          <button variant='extendedFab' onClick={this.props.sendMessage}>Send</button>
        </div>
    )
  }
}
