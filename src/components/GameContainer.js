import React,  { Component } from 'react'

import GameView from './GameView'
import MessageInput from './MessageInput'

export default class GameContainer extends Component {

  state = {
    score: 0,
    answer: null,
    round: 0,
    gameOn: false,
    gamePrompts: [],
    guessField: '',
    gameObject: {}
  }

  gameOn = () => {
    this.setState({
      gameOn: true,
      round: 1
    })
    fetch(`http://localhost:3000/games`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(r=>r.json()).then(resp => {
      this.setState({
        gamePrompts: resp.prompts,
        answer: resp.prompts[0].name,
        gameObject: resp
      })
    }
    )
  }

  inputChange = (e) => {
    const value = e.target.value
    this.setState({guessField: value})
  }

  setScore = (e) => {
    e.preventDefault()
    const guess = e.target.guess.value
    const answer = this.state.answer
    if (guess.toLowerCase() === answer.toLowerCase()){
      console.log('Correct!')
      if(this.checkRoundInner()){
        this.setState(prevState => ({
          score: prevState.score + 1,
          round: prevState.round + 1
        }))
      } else{
        this.setState(prevState => ({
          score: prevState.score + 1,
          round: prevState.round + 1,
          answer: this.state.gamePrompts[prevState.round].name
        }))
      }
    } else {
      console.log('Sorry, try again!')
    }
  }

  checkRound = () => {
    return this.state.round > 5
  }

  checkRoundInner = () => {
    return this.state.round >= 5
  }

  endGame = () => {
    const gameID = this.state.gameObject.id
    const currentUser = this.props.currentUser
    console.log(`Game over! You scored ${this.state.score} points!`)
    this.setState({
      round: 0,
      answer: null,
      score: 0,
      prompts: [],
      gameOn: false
    })
    fetch(`http://localhost:3000/games/${gameID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: {winner_id: currentUser.id}
    }).then(r=>r.json()).then(console.log)
  }

  componentDidUpdate(){
    this.checkRound() ? this.endGame() : ''
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <GameView />
        {this.state.gameOn
          ? <MessageInput inputChange={this.inputChange} controlField={this.state.guessField} score={this.state.score} setScore={this.setScore}/>
          : <button onClick={this.gameOn}>Game On!</button>
        }

      </div>
    )
  }
}
