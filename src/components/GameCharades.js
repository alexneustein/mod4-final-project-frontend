import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import Peer from 'simple-peer'

// require('./js/rtcAdapter')

export default class GameCharades extends Component {
  componentDidMount() {
    // this.initWS()
    // this.initVideo()
    // this.sendMessage()
    navigator.getUserMedia({ video: true, audio: false }, this.gotMedia, function () {})
    console.log("GameCharades", this.props.username)
  }

  // initWS = () => {
  //   const url = "ws://localhost:3000/cable"
  //   const connectionWS = new WebSocket(url)
  //
  //   connectionWS.onopen = () => {
  //     // console.log("Socket open.")
  //     const subscribe = {
  //       command: 'subscribe',
  //       identifier: JSON.stringify({
  //         channel: 'game_line_channel'
  //       })
  //     }
  //     connectionWS.send(JSON.stringify(subscribe))
  //   }
  // }


  onReceived = e => {
    console.log(e)
    // this.initPeerConnection()
  }

  sendMessage = () => {
    const message = "testing"
    this.refs.gameLineChannel.perform('send_signal', {message})
  }

  // async initVideo() {
  //   const constraints = { audio: false, video: true }
  //
  //   await navigator.mediaDevices.getUserMedia(constraints)
  //     .then(stream => {
  //       const video = document.querySelector("video")
  //       video.srcObject = stream
  //       // const videoTracks = stream.getVideoTracks()
  //       const videoTracks = stream.getTracks()
  //       window.stream = stream
  //       // video.play()
  //     })
  // }

  gotMedia = (stream) => {
    var peer1 = new Peer({ initiator: true, stream: stream })
    var peer2 = new Peer()

    if(this.props.username === "User 1") {
      peer1.on('signal', function (data) {
        peer2.signal(data)
      })
    }

    if(this.props.username === "User 2") {
      peer2.on('signal', function (data) {
        peer1.signal(data)
      })
    }

    peer2.on('stream', function (stream) {
      // got remote video stream, now let's show it in a video tag
      var video = document.querySelector('video')
      video.src = window.URL.createObjectURL(stream)
      video.play()
    })
  }

  render() {
    return (
      <div>
        <ActionCable ref="gameLineChannel" channel={{channel: 'GameLineChannel'}} onReceived={this.onReceived} />
        <video id="received_video" autoPlay muted></video>
        <video id="local_video" autoPlay muted></video>
        <div>

        </div>
      </div>
    )
  }
}
