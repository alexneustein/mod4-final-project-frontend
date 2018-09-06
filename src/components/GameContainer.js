import React,  { Component } from 'react'

import GameView from './GameView'
import MessageInput from './MessageInput'

export default class GameContainer extends Component {
  render() {
    return (
      <div>
        <GameView />
        <MessageInput />
      </div>
    )
  }
}
