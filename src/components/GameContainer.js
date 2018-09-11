import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'
import GameView from './GameView'
import MessageInput from './MessageInput'
import Button from '../MaterialComponents/Button'

// import Snackbar from '@material-ui/core/Snackbar'

export default class GameContainer extends Component {

  state = {
    score: 0,
    answer: '',
    round: 0,
    gameOn: false,
    performer: 0,
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
      const gameObj = {
      // gamePrompts: resp.prompts,
      answer: resp.prompts[0].name,
      gameObject: resp,
      gameOn: true,
      round: 1,
      performer: this.props.currentUser.id
    }
      this.sendGameOn(gameObj)
      // this.setState({gameObj})
    }
    )
  }

  sendGameOn = (gameHash) => {
    this.refs.ScoreChannel.perform('onGameChange', {gameHash})
  }

  inputChange = (e) => {
    const value = e.target.value
    this.setState({guessField: value})
  }

  setScore = (e) => {
    e.preventDefault()
    const guess = e.target.guess.value
    const answer = this.state.answer
    const performer = this.props.currentUser.id
    this.gameDigest(guess, answer, performer)
  }


gameDigest = (guess, answer, performer) => {
  console.log('Game digest', this.state)
  if (this.checkRoundInner()){
    const gameHash = {performer: performer, score: this.state.score + 1, round: this.state.round + 1, answer: ''}
    this.sendScore(gameHash)
  } else if (guess.toLowerCase() === answer.toLowerCase()){
    const gameHash = {performer: performer, score: this.state.score + 1, round: this.state.round + 1, answer: this.state.gameObject.prompts[this.state.round].name}
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
    const score = this.state.score
    console.log(`Game over! You scored ${this.state.score} points!`)
    this.setState({
      round: 0,
      answer: null,
      score: 0,
      // gamePrompts: [],
      gameOn: false
    })
    fetch(`http://localhost:3000/games/${gameID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({winner_id: score})
    }).then(r=>r.json()).then(console.log)
  }

  dataReceived = (e) => {
    // console.log("sent data", e.game_data.gameHash)
    // console.log("current state", this.state)
    const gameAnswer = e.game_data.gameHash.answer
    const gameHash = e.game_data.gameHash
    const gameObject = e.game_data.gameHash.gameObject
    console.log('dataReceived before stateset', e.game_data)
    if(gameHash.round === 1){
      // console.log('Round 1???')
      this.setState({
        answer: gameAnswer,
        gameObject: gameObject,
        gameOn: true,
        performer: gameHash.performer
      }, () => console.log('dataReceived after stateset', this.state))
    } else if (this.checkRoundInner()){
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
        answer: this.state.gameObject.prompts[prevState.round].name
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
        {this.state.gameOn
          ? <MessageInput answer={this.state.answer} currentUser={this.props.currentUser} performer={this.state.performer} inputChange={this.inputChange} controlField={this.state.guessField} score={this.state.score} setScore={this.setScore}/>
          :  <Button onClick={this.gameOn} color='secondary' buttonText='GAME ON'/>
        }
        { this.state.gameOn ?
        <h3>
          Score: {this.state.score}
        </h3>
        :
        ''}

      </div>
    )
  }
}
