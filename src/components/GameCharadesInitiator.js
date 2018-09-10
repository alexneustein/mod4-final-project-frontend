import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
const Peer = require('simple-peer')

let p1
let streamObj

export default class GameCharades extends Component {
  state = {
    signal: ""
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        p1 = new Peer({ initiator: true, stream: stream, trickle: false })
        console.log("STREAM OBJ", stream)
        streamObj = stream

        p1.on('signal', (data) => {
          console.log('p1 signal', data)
          this.sendMessage('send_signal', {init_signal: data})
        })
      })
  }

  componentDidUpdate() {
    console.log("componentDidUpdate SIGNAL", this.state.signal)

    if('rec_signal' in this.state.signal) {
      // console.log("rec_signal", this.state.signal.rec_signal)
      p1.signal(this.state.signal.rec_signal)
    }

    if('rec_stream' in this.state.signal) {
      // p1.send(streamObj)
      // console.log(p1)
      this.sendMessage('send_signal', {init_stream: streamObj})
    }

    p1.on('connect', () => {
      console.log('p1 connected')
    })
    p1.on('error', (error) => console.error('p1 error', error))
    p1.on('close', () => console.log('p1 connection closed'))
  }

  onReceived = e => {
    if(e.data.forInitiator) {
      this.setState({signal: e.data.forInitiator}, () => {
        console.log("forInitiator", this.state.signal)
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
        {/* <ActionCable ref="gameChannelReceiver" channel={{channel: 'GameChannelReceiver'}} /> */}
        {/* <video id="received_video" autoPlay muted></video> */}
        {/* <video id="local_video" autoPlay muted></video> */}
        <div>
          <button onClick={this.testMessage}>test</button>
        </div>
      </div>
    )
  }
}
