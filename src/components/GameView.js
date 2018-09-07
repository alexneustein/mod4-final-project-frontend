import React,  { Component } from 'react'
import GameCharades from './GameCharades'
// import io from 'socket.io'

// const io = require('socket.io')()
// const io = require('socket.io')(80, { wsEngine: 'ws' });

export default class GameView extends Component {
  render() {
    return (
      <div id="game-view">
        <GameCharades />
      </div>
    )
  }
}
