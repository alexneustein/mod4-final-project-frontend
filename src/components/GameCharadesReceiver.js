import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
const Peer = require('simple-peer')

let p1

export default class GameCharades extends Component {
  state = {
    signal: {}
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        p1 = new Peer({ trickle: false, stream: stream })

        const video = document.querySelector('video#local-video')
        video.srcObject = stream
        video.play()
      })
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate SIGNAL", this.state.signal)

    if('init_signal' in this.state.signal) {
      p1.signal(this.state.signal.init_signal)
      p1.on('signal', (data) => {
        // console.log('p1 signal', data)
        this.sendMessage('send_signal', {rec_signal: data})
      })
    }

    if(p1) {
      p1.on('stream', (stream) => {
        // console.log('p1 received', stream)
        const video = document.querySelector('video#received-video')
        video.srcObject = stream
        video.play()
      })

      p1.on('connect', () => {
        // console.log('p1 connected')
        this.sendMessage('send_signal', {rec_stream: ""})
      })
      p1.on('error', (error) => console.error('p1 error', error))
      p1.on('close', () => console.log('p1 connection closed'))
    }
  }


  onReceived = e => {
    if(e.data.forReceiver) {
      this.setState({signal: e.data.forReceiver}, () => {
        // console.log("forReceiver", this.state.signal)
      })
    }
  }

  sendMessage = (method, forInitiator) => {
    this.refs.gameSignalChannel.perform(method, {forInitiator})
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
