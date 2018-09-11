import React,  { Component } from 'react'

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

  addClick = (x, y, dragging) => {
    const clickX = this.state.clickX.slice()
    const clickY = this.state.clickY.slice()
    const clickDrag = this.state.clickDrag.slice()

    clickX.push(x)
    clickY.push(y)
    clickDrag.push(dragging)

    this.setState({clickX, clickY, clickDrag}, () => {
      // console.log(this.state)
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
    context.lineWidth = 3

    for(var i=0; i < clickX.length; i++) {
      context.beginPath();

      if (clickDrag[i] && i) {
        context.moveTo(clickX[i-1], clickY[i-1]);
       } else {
         context.moveTo(clickX[i]-1, clickY[i]);
       }

     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.stroke();
    }
  }

  mouseDown = e => {
    this.setState({paint: true})
    this.addClick(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    this.redraw()
    // console.log(e.target)
  }

  mouseMove = e => {
    if(this.state.paint) {
      this.addClick(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
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
      <div id="canvas-wrap">
        <canvas id="game-canvas" height="500" width="500" onClick={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onMouseLeave={this.mouseLeave}></canvas>
      </div>
    )
  }
}
