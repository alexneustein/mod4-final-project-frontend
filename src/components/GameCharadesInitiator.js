import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
const Peer = require('simple-peer')

let p1

export default class GameCharades extends Component {
  state = {
    signal: ""
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        p1 = new Peer({ initiator: true, stream: stream, trickle: false })
        // console.log("STREAM OBJ", stream)

        const video = document.querySelector('video#local-video')
        video.srcObject = stream
        video.play()

        p1.on('signal', (data) => {
          // console.log('p1 signal', data)
          this.sendMessage('send_signal', {init_signal: data})
        })
      })
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate SIGNAL", this.state.signal)

    if('rec_signal' in this.state.signal) {
      p1.signal(this.state.signal.rec_signal)
    }

    if('rec_stream' in this.state.signal) {
      this.sendMessage('send_signal', {init_stream: ""})
    }

    p1.on('stream', (stream) => {
      // console.log('p1 received', stream)
      const video = document.querySelector('video#received-video')
      video.srcObject = stream
      video.play()
    })

    p1.on('connect', () => {
      // console.log('p1 connected')
    })
    p1.on('error', (error) => console.error('p1 error', error))
    p1.on('close', () => console.log('p1 connection closed'))
  }

  onReceived = e => {
    if(e.data.forInitiator) {
      this.setState({signal: e.data.forInitiator}, () => {
        // console.log("forInitiator", this.state.signal)
      })
    }
  }

  sendMessage = (method, forReceiver) => {
    this.refs.gameSignalChannel.perform(method, {forReceiver})
  }

  testMessage = () => {
  }

  render() {
    return (
      <div>
        <ActionCable ref="gameSignalChannel" channel={{channel: 'GameSignalChannel'}} onReceived={this.onReceived} />
        <div>
          <div id="video-wrapper">
            <video id="local-video" autoPlay muted></video>
            <video id="received-video" autoPlay muted></video>
          </div>
        </div>
      </div>
    )
  }
}
