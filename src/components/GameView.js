import React, { Component } from 'react'

import GameCharadesInitiator from './GameCharadesInitiator'
import GameCharadesReceiver from './GameCharadesReceiver'
import GameAudiooInitiator from './GameAudiooInitiator'
import GameAudiooReceiver from './GameAudiooReceiver'
import GameDraw from './GameDraw'

export default class GameView extends Component {
  state = {
    username: "Tester"
  }

  componentDidMount() {

  }

  render() {
    return (
      <div id="game-view">
        {document.location.hash === "#1" ? <GameCharadesReceiver username={this.state.username} /> : <GameCharadesInitiator username={this.state.username} /> }
        {/* <GameDraw /> */}
      </div>
    )
  }
}
