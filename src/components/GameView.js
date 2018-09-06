import React,  { Component } from 'react'

import videojs from '../js/video'

export default class GameView extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div id="game-view">
        <video></video>
      </div>
    )
  }
}
