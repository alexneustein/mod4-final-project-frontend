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
    // this.initWS()
    // this.initVideo()
    // this.sendMessage()
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        streamObj = stream
        // console.log("STREAM", streamObj)
        p1 = new Peer({ initiator: true, stream: stream, trickle: false })

        p1.on('signal', (data) => {
          console.log('p1 signal', data)
          this.sendMessage('send_signal', {init_signal: data})
        })
        // console.log("STREAM", streamObj)

        // var p2 = new Peer({ trickle: false })

        // if('rec_connect' in this.state.signal) {
        //   p1.on('connect', () => {
        //     console.log('p1 connected')
        //     this.sendMessage('send_signal', "init_connect")
        //   })
        // }
        //
        // if(this.state.signal === "rec_stream") {
        //   p1.on('stream', (data) => {
        //     console.log('p1 received', data)
        //     this.sendMessage('send_signal', "init_stream")
        //   })
        // }
        //
        // p1.on('error', (error) => console.error('p1 error', error))
        // p1.on('close', () => console.log('p1 connection closed'))
      })
    // console.log("GameCharades", this.props.username)
  }

  componentDidUpdate() {
    console.log("componentDidUpdate SIGNAL", this.state.signal)
    // console.log("P1", p1)
    // p1.on('signal', (data) => {
    //   console.log('p1 signal', data)
    //   this.sendMessage('send_signal', {"init_signal": data})
    //   // p2.signal(data)
    // })

    if('rec_signal' in this.state.signal) {
      p1.signal(this.state.signal.rec_signal)
      p1.on('connect', () => {
        console.log('p1 connected')

        // p1.on('stream', (stream) => {
        //   console.log('p1 received', stream)
        // })
        console.log("FDSAFDSAFDSA", streamObj)
        this.sendMessage('send_signal', {init_stream: ""})

        // this.sendMessage('send_signal', {'init_connect': data})
      })
    }

    // if('rec_stream' in this.state.signal) {
    //   p1.on('stream', (data) => {
    //     console.log('p1 received', data)
    //     this.sendMessage('send_signal', {'init_stream': data})
    //   })
    // }

    p1.on('error', (error) => console.error('p1 error', error))
    p1.on('close', () => console.log('p1 connection closed'))
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
    if(e.data.forInitiator) {
      this.setState({signal: e.data.forInitiator}, () => {
        console.log("forInitiator", this.state.signal)
      })
    }
    // if(e.data.message === "init_signal") {
    //   this.setState({signal: "init_signal"})
    // }
  }

  sendMessage = (method, forReceiver) => {
    // message = JSON.stringify(message)
    this.refs.gameSignalChannel.perform(method, {forReceiver})
    // this.refs.gameChannelInitiator.perform(method, {message: "Is this the receiver?"})
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
    // var p1 = new Peer({ initiator: true, stream: stream, trickle: false })
    // // var p2 = new Peer({ trickle: false })
    //
    // p1.on('signal', (data) => {
    //   console.log('p1 signal', data)
    //   this.sendMessage('send_signal', {"init": data})
    //   // p2.signal(data)
    // })
    //
    // if(this.state.signal === "rec_connect") {
    //   p1.on('connect', () => {
    //     console.log('p1 connected')
    //     this.sendMessage('send_signal', "init_connect")
    //   })
    // }
    //
    // if(this.state.signal === "rec_stream") {
    //   p1.on('stream', (data) => {
    //     console.log('p1 received', data)
    //     this.sendMessage('send_signal', "init_stream")
    //   })
    // }
    //
    // p1.on('error', (error) => console.error('p1 error', error))
    // p1.on('close', () => console.log('p1 connection closed'))


    // p2.on('signal', (data) => {
    //   console.log('p2 signal', data)
    //   p1.signal(data)
    // })
    // p2.on('connect', () => console.log('p2 connected'))
    // p2.on('stream', (stream) => {
    //   console.log('p2 received', stream)
    //   var video = document.querySelector('video')
    //   video.src = window.URL.createObjectURL(stream)
    //   video.play()
    // })
    // p2.on('error', (error) => console.error('p2 error', error))
    // p2.on('close', () => console.log('p2 connection closed'))



  }

  render() {
    return (
      <div>
        <ActionCable ref="gameSignalChannel" channel={{channel: 'GameSignalChannel'}} onReceived={this.onReceived} />
        {/* <ActionCable ref="gameChannelReceiver" channel={{channel: 'GameChannelReceiver'}} /> */}
        {/* <video id="received_video" autoPlay muted></video> */}
        {/* <video id="local_video" autoPlay muted></video> */}
        <div>
          {/* <button onClick={this.sendMessage}>test</button> */}
        </div>
      </div>
    )
  }
}
