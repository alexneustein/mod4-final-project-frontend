import React,  { Component } from 'react'

// import Peer from 'simple-peer'
// import videojs from '../js/video'

export default class GameCharades extends Component {

  componentDidMount() {
    this.initWS()
    // this.initVideo()
  }

  initWS = () => {
    const url = "ws://localhost:3000/cable"
    const connectionWS = new WebSocket(url)

    connectionWS.onopen = () => {
      // console.log("Socket open.")
      const subscribe = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'game_line_channel'
        })
      }
      connectionWS.send(JSON.stringify(subscribe))
    }
  }

  async initVideo() {
    const constraints = { audio: false, video: true }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    const video = document.querySelector("video")
    const videoTracks = stream.getVideoTracks()
    window.stream = stream
    video.srcObject = stream
    video.play()
  }

  render() {
    return (
      <div>
        <video></video>
      </div>
    )
  }
}
