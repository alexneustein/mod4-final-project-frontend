import React from 'react';
import {ActionCable} from 'react-actioncable-provider'

export default class Cable extends React.Component{

  render(){
    return(
      <ActionCable
        channel={{channel: 'game_line_channel'}}
        onReceived={console.log}
       />
    );
  }
}
