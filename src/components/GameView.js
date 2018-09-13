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

  componentDidUpdate(){

  }

  viewSwitch = () => {
    switch (this.props.gameMode){
      case 1:
      return <GameDraw />
      break
      case 2:
      return document.location.hash === "#1" ? <GameCharadesReceiver username={this.state.username} /> : <GameCharadesInitiator username={this.state.username} />
      break
      case 3:
      return  document.location.hash === "#1" ? <GameAudiooReceiver username={this.state.username} /> : <GameAudiooInitiator username={this.state.username} /> 
      break
    }
  }


  render() {
    return (
      <div id="game-view">
        {this.viewSwitch()}
      </div>
    )
  }
}
