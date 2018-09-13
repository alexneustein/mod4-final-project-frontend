import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
require('events').EventEmitter.prototype._maxListeners = 100
const Peer = require('simple-peer')

let p1
// let reconnectSignal

export default class GameAudiooInitiator extends Component {
  state = {
    signal: {}
  }

  componentDidMount() {
    window.setTimeout(this.initPeer, 2000)
    // reconnectSignal = window.setInterval(() => {
    //   this.initPeer()
    // }, 3000)
  }

  componentDidUpdate() {
    // console.log("componentDidUpdate SIGNAL", this.state.signal)

    if(p1) {
      if('rec_signal' in this.state.signal) {
        // window.clearInterval(reconnectSignal)
        // console.log("RECSIGNAL", p1)
        const signal = {...this.state.signal.rec_signal}

        this.setState({signal: {}}, () => {
          p1.signal(signal)
          // console.log("SIGNAFDAFA", this.state)
        })
      }

      if('rec_stream' in this.state.signal) {
        this.setState({signal: {}}, () => {
          this.sendSignal('send_signal', {init_stream: true})
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
      })
      p1.on('error', (error) => console.error('p1 error', error))
      p1.on('close', () => {
        console.log('p1 connection closed')
        p1.removeListener('signal', p1.signal)
        // console.log("CLOSE", p1)
        // this.initPeer()
      })
    }
  }

  onReceived = e => {
    if(e.data.forInitiator) {
      this.setState({signal: e.data.forInitiator}, () => {
        console.log("forInitiator", this.state.signal)
      })
    }
    if(e.data.reconnect) {
      p1.destroy()
      this.initPeer()
      console.log("RECONNECTING")
    }
  }

  sendSignal = (method, forReceiver) => {
    this.refs.gameSignalChannel.perform(method, {forReceiver})
  }

  reconnectSignal = (method, reconnect) => {
    this.refs.gameSignalChannel.perform(method, {reconnect})
  }

  reconnect = () => {
    this.reconnectSignal('send_signal', {reconnect: true})
    console.log("test")
  }

  initPeer = () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true })
      .then(stream => {
        p1 = new Peer({ initiator: true, stream: stream, trickle: false })
        // console.log("STREAM OBJ", stream)
        // console.log("INITPEER", p1)

        const video = document.querySelector('video#local-video')
        video.srcObject = stream
        // video.play()


      })
      .then(() => {
        p1.on('signal', (data) => {
          // console.log('p1 signal', data)
          this.sendSignal('send_signal', {init_signal: data})
        })
      })
  }

  render() {
    return (
      <div>
        <ActionCable ref="gameSignalChannel" channel={{channel: 'GameSignalChannel'}} onReceived={this.onReceived} />
        <div id="video-wrapper">
          <video id="local-video" autoPlay muted></video>
          <video id="received-video" autoPlay muted></video>
          <button onClick={this.reconnect}>Reconnect</button>
        </div>
      </div>
    )
  }
}
