import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
const Peer = require('simple-peer')

let p1

export default class GameCharades extends Component {
  state = {
    signal: {}
  }

  componentDidMount() {
    this.initPeer()
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate SIGNAL", this.state.signal)

    if(p1) {
      if('init_signal' in this.state.signal) {
        const signal = {...this.state.signal.init_signal}

        this.setState({signal: {}}, () => {
          p1.signal(signal)
          p1.on('signal', (data) => {
            console.log('p1 signal', data)
            this.sendSignal('send_signal', {rec_signal: data})
          })
        })
      }

      p1.on('stream', (stream) => {
        // console.log('p1 received', stream)
        const video = document.querySelector('video#received-video')
        video.srcObject = stream
        // video.play()
      })

      p1.on('connect', () => {
        // console.log('p1 connected')
        this.sendSignal('send_signal', {rec_stream: true})
      })
      p1.on('error', (error) => console.error('p1 error', error))
      p1.on('close', () => {
        console.log('p1 connection closed')
        // this.initPeer()
      })
    }
  }


  onReceived = e => {
    if(e.data.forReceiver) {
      this.setState({signal: e.data.forReceiver}, () => {
        console.log("forReceiver", this.state.signal)
      })
    }
  }

  sendSignal = (method, forInitiator) => {
    this.refs.gameSignalChannel.perform(method, {forInitiator})
  }

  initPeer = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        p1 = new Peer({ trickle: false, stream: stream })

        const video = document.querySelector('video#local-video')
        video.srcObject = stream
        // video.play()
      })
  }

  render() {
    return (
      <div>
        <ActionCable ref="gameSignalChannel" channel={{channel: 'GameSignalChannel'}} onReceived={this.onReceived} />
        <div id="video-wrapper">
          <video id="local-video" autoPlay muted></video>
          <video id="received-video" autoPlay muted></video>
        </div>
      </div>
    )
  }
}
