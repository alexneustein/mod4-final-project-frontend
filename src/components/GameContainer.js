import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'

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

  componentDidUpdate(){
    this.checkRound() ? this.endGame() : ''
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
    this.gameDigest(guess, answer)
  }


gameDigest = (guess, answer) => {
  if (guess.toLowerCase() === answer.toLowerCase()){
    const gameHash = {score: this.state.score + 1, round: this.state.round + 1, answer: this.state.gamePrompts[this.state.round].name}
    this.sendScore(gameHash)
    console.log('Correct!')
  } else {
    console.log('Sorry, try again!')
  }
  this.setState({guessField: ''})
}

  sendScore = (gameHash) => {
    this.refs.ScoreChannel.perform('onGameChange', {gameHash})
    this.setState({message: ''})
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
    // console.log(`Game over! You scored ${this.state.score} points!`)
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
      body: JSON.stringify({winner_id: currentUser.id})
    }).then(r=>r.json()).then(console.log)
  }

  dataReceived = (e) => {
    console.log(e)
    if(this.checkRoundInner()){
      this.setState(prevState => ({
        ...prevState,
        score: prevState.score + 1,
        round: prevState.round + 1
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        score: prevState.score + 1,
        round: prevState.round + 1,
        answer: this.state.gamePrompts[prevState.round].name
      }))
    }
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <ActionCable
          ref='ScoreChannel'
          channel={{channel:'ScoreChannel'}}
          onReceived={this.dataReceived}
        />
        <GameView />
        <h2>{this.state.answer}</h2>
        {this.state.gameOn
          ? <MessageInput inputChange={this.inputChange} controlField={this.state.guessField} score={this.state.score} setScore={this.setScore}/>
          : <button onClick={this.gameOn}>Game On!</button>
        }
        <h3>
          {this.state.score}
        </h3>

      </div>
    )
  }
}
