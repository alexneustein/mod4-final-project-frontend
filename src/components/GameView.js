import React,  { Component } from 'react'
import GameCharades from './GameCharades'

export default class GameView extends Component {
  render() {
    return (
      <div id="game-view">
        <GameCharades />
      </div>
    )
  }
}
