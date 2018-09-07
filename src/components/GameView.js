import React, { Component } from 'react'
import GameCharades from './GameCharades'
import { ActionCableProvider } from 'react-actioncable-provider'

export default class GameView extends Component {
  state = {
    username: ""
  }

  setUser1 = () => {
    this.setState({username: "User 1"}, () => {
      console.log(this.state.username)
    })
  }

  setUser2 = () => {
    this.setState({username: "User 2"}, () => {
      console.log(this.state.username)
    })
  }

  render() {
    return (
      <div id="game-view">
        {/* <ActionCableProvider url="ws://localhost:3000/cable"> */}
        {this.state.username === "" ? null : <GameCharades username={this.state.username} /> }
        {/* </ActionCableProvider> */}
        <button onClick={this.setUser1}>User 1</button>
        <button onClick={this.setUser2}>User 2</button>
      </div>
    )
  }
}
