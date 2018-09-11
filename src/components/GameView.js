import React, { Component } from 'react'

import GameCharadesInitiator from './GameCharadesInitiator'
import GameCharadesReceiver from './GameCharadesReceiver'

import GameDraw from './GameDraw'

export default class GameView extends Component {
  state = {
    username: "Tester"
  }

  render() {
    return (
      <div id="game-view">
        {/* {document.location.hash === "#1" ? <GameCharadesReceiver username={this.state.username} /> : <GameCharadesInitiator username={this.state.username} /> } */}
        <GameDraw />
      </div>
    )
  }
}
