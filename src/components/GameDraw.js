import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'

export default class GameDraw extends Component {
  state = {
    clickX: new Array(),
    clickY: new Array(),
    clickDrag: new Array(),
    paint: "",
    context: ""
  }
  componentDidMount() {
    const canvas = document.querySelector("#game-canvas")
    canvas.height = 500
    canvas.width = 700
    canvas.style.backgroundColor = "#444444"
    const context = canvas.getContext('2d')
    this.setState({context})
  }

  componentDidUpdate() {
    this.redraw()
  }

  onReceived = e => {
    // console.log(e)
    const clickX = e.data.clickX
    const clickY = e.data.clickY
    const clickDrag = e.data.clickDrag
    this.setState({clickX, clickY, clickDrag})
  }

  sendCoords = coords => {
    this.refs.drawCoordsChannel.perform('send_coords', coords)
  }

  addClick = (x, y, dragging) => {
    const clickX = this.state.clickX.slice()
    const clickY = this.state.clickY.slice()
    const clickDrag = this.state.clickDrag.slice()

    clickX.push(x)
    clickY.push(y)
    clickDrag.push(dragging)

    this.setState({clickX, clickY, clickDrag}, () => {
      // console.log(this.state)
      this.sendCoords({
        clickX: this.state.clickX,
        clickY: this.state.clickY,
        clickDrag: this.state.clickDrag
      })
    })
  }

  redraw = () => {
    const context = this.state.context
    const clickX = this.state.clickX
    const clickY = this.state.clickY
    const clickDrag = this.state.clickDrag

    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.strokeStyle = "#ffffff"
    context.lineJoin = "round"
    context.lineWidth = 5

    for(var i = 0; i < clickX.length; i++) {
      context.beginPath()

      // console.log(this.state)

      if (clickDrag[i] && i) {
        context.moveTo(clickX[i-1], clickY[i-1])
      } else {
         context.moveTo(clickX[i]-1, clickY[i])
      }

     context.lineTo(clickX[i], clickY[i])
     context.closePath()
     context.stroke()
    }
  }

  mouseDown = e => {
    // e.persist()
    this.addClick(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    this.setState({paint: true}, () => {
      this.redraw()
    })

    // console.log(e.target)
  }

  mouseMove = e => {
    // console.log(e)
    if(this.state.paint) {
      this.addClick(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop, true)
      this.redraw()
      // console.log(e.target)
    }
  }

  mouseUp = e => {
    this.setState({paint: false})
    // console.log(e.target)
  }

  mouseLeave = e => {
    this.setState({paint: false})
    // console.log(e.target)
  }

  render() {
    return (
      <div>
        <ActionCable ref="drawCoordsChannel" channel={{channel: 'DrawCoordsChannel'}} onReceived={this.onReceived} />
        <div id="canvas-wrap">
          <canvas id="game-canvas" height="500" width="500" onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseLeave={this.mouseLeave}></canvas>
        </div>
      </div>
    )
  }
}
