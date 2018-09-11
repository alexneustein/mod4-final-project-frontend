import React, { Component } from 'react'
import GameCharadesInitiator from './GameCharadesInitiator'
import GameCharadesReceiver from './GameCharadesReceiver'
import { ActionCableProvider } from 'react-actioncable-provider'

export default class GameView extends Component {
  state = {
    username: "Tester"
  }

  render() {
    return (
      <div id="game-view">
        {document.location.hash === "#1" ? <GameCharadesReceiver username={this.state.username} /> : <GameCharadesInitiator username={this.state.username} /> }
        {/* <button onClick={this.setUser1}>User 1</button> */}
        {/* <button onClick={this.setUser2}>User 2</button> */}
      </div>
    )
  }
}
