import React, { Component } from 'react'

import GameCharadesInitiator from './GameCharadesInitiator'
import GameCharadesReceiver from './GameCharadesReceiver'
import GameAudiooInitiator from './GameAudiooInitiator'
import GameAudiooReceiver from './GameAudiooReceiver'
import GameDraw from './GameDraw'

export default class GameView extends Component {
  state = {
    username: "Tester",
    // snackBarOpen: false
  }

  componentDidMount() {

  }

  componentDidUpdate(){

  }
  //
  // snackbarClose = () => {
  //   this.setState({snackbarOpen: false})
  // }
  //
  // snackbarSend = snackbarMessage => {
  //   // this.setState({snackbarMessage, snackBarOpen: true})
  //   this.setState({snackbarOpen: true, snackbarMessage})
  // }

  modeSnack = (gameMode) => {
    console.log(gameMode)
    if(gameMode === 1){
      return 'DRAW!!!'
    } else if (gameMode ===  2){
      return 'MIME!!!'
    } else if (gameMode === 3){
      return 'TALK!!!'
    }
  }




  viewSwitch = () => {
    const mode = this.props.gameMode
    switch (mode){
      case 1:
      // this.modeSnack(1)
      return <GameDraw />
      break
      case 2:
      // this.modeSnack(2)
      return document.location.hash === "#1" ? <GameCharadesReceiver username={this.state.username} /> : <GameCharadesInitiator username={this.state.username} />
      break
      case 3:
      // this.modeSnack(3)
      return  document.location.hash === "#1" ? <GameAudiooReceiver username={this.state.username} /> : <GameAudiooInitiator username={this.state.username} />
      break
    }
  }


  render() {
    return (
      <div id="game-view" >
        <div className="App-title">
        {this.modeSnack(this.props.gameMode)} </div>
        <div>
        {this.viewSwitch()}
      </div>
      </div>
    )
  }
}
