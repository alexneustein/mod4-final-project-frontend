import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'

import GameView from './GameView'

import MessageInput from './MessageInput'
import MyButton from '../MaterialComponents/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import NotificationImportant from '@material-ui/icons/NotificationImportant'

export default class GameContainer extends Component {

  state = {
    score: 0,
    answer: '',
    round: 1,
    gameOn: false,
    performer: 0,
    guessField: '',
    gameObject: {},
    snackbarOpen: false
  }

  componentDidMount() {
    this.setState({snackbarOpen: true})
  }

  snackbarClose = () => {
    this.setState({snackbarOpen: false})
  }

  // Controlled Field For Guess
  inputChange = (e) => {
    const value = e.target.value
    this.setState({guessField: value})
  }

  // When called, activates the game mode
  gameOn = () => {
    this.setState({
      gameOn: true,
    })
      // The component updates before the fetch, but we don't want to send the game object before we have the data
    fetch(`http://localhost:3000/games`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      }
    }).then(r=>r.json()).then(resp => {
      const gameObj = {
      answer: resp.prompts[0].name,
      gameObject: resp,
      gameOn: true,
      round: 1,
      performer: this.props.currentUser.id
    }
        // This is the major piece of the puzzle
      this.sendGameOn(gameObj)
    }
    )
  }
    // Sends the game data to the channel, initializing the game for the other player
  sendGameOn = (gameHash) => {
    this.refs.ScoreChannel.perform('onGameChange', {gameHash})
  }

    // Upon Reception of the data, this function breaks down the channel data
  dataReceived = (e) => {

    const gameAnswer = e.game_data.gameHash.answer
    const gameHash = e.game_data.gameHash
    const gameObject = e.game_data.gameHash.gameObject

    console.log('dataReceived before stateset', e.game_data)

    if(gameHash.round === 1){
      this.setState({
        answer: gameAnswer,
        gameObject: gameObject,
        gameOn: true,
        performer: gameHash.performer
      })
    }
    // This one will be replaced with the timer function
    else if (this.checkRoundInner()){
      this.setState(prevState => ({
        ...prevState,
        score: prevState.score + 1,
        round: prevState.round + 1
      }))
    }

    else {
      this.setState(prevState => ({
        ...prevState,
        score: gameHash.score,
        round: gameHash.round,
        answer: gameAnswer,
        performer: gameHash.performer
      }))
    }
  }

    // After setting State, it checks for the round - maybe it should check for more?
  componentDidUpdate(){
    this.checkRound() ? this.endGame() : ''

  }

  // sendMessage = (content) => {
  //   this.refs.ChatChannel.perform('onChat', {content})
  // }
  //
  // messageHandle = (content) => {
  //   this.props.createMessage(content)
  // }

  setScore = (e) => {
    e.preventDefault()
    const guess = e.target.guess.value
    const answer = this.state.answer
    const performer = this.props.currentUser.id
    // this.sendMessage({user: {username: `${this.props.currentUser.username}'s Guess`}, message: guess})
    this.gameDigest(guess, answer, performer)
  }

  gameDigest = (guess, answer, performer) => {
    console.log('Game digest', this.state)
    if (this.checkRoundInner()){
      const gameHash = {performer: performer, score: this.state.score + 1, round: this.state.round + 1, answer: ''}
      this.sendScore(gameHash)
    } else if (guess.toLowerCase() === answer.toLowerCase()){
      const gameHash = {performer: performer, score: this.state.score + 1, round: this.state.round + 1, answer: this.state.gameObject.prompts[this.state.round].name, gameObject: this.state.gameObject}
      this.sendScore(gameHash)
      // this.setState({snackMessage: 'Correct!'})
      // this.snackBarOpen()
    } else {
      console.log('Sorry, try again!')
    }
    this.setState({guessField: ''})
  }

  sendScore = (gameHash) => {
    this.refs.ScoreChannel.perform('onGameChange', {gameHash})
    console.log(gameHash)
    this.setState({message: ''})
  }

  checkRound = () => {
    return this.state.round > 5
  }

  checkRoundInner = () => {
    return this.state.round >= 5
  }


    // Thus, the game ends
  endGame = () => {
    const gameID = this.state.gameObject.id
    const score = this.state.score
    console.log(`Game over! You scored ${this.state.score} points!`)
    this.setState({
      round: 0,
      answer: null,
      score: 0,
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

  render() {
    console.log(this.state)
    return (
      <div>
        <ActionCable
          ref='ScoreChannel'
          channel={{channel:'ScoreChannel'}}
          onReceived={this.dataReceived}
        />
        {/* <ActionCable
          ref='ChatChannel'
          channel={{channel: 'ChatChannel'}}
          onReceived={this.messageHandle}
         /> */}
        <GameView />

        <div id="snackbar-wrap">
          <Snackbar
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'top'
            }}
            open={this.state.snackbarOpen}
            onClose={this.snackbarClose}
            autoHideDuration={2000}
            message={"Message"}
            id={"snackbar"}
            TransitionComponent={Fade}
          />
        </div>

        {this.state.gameOn
          ? <MessageInput createMessage={this.props.createMessage} answer={this.state.answer} currentUser={this.props.currentUser} performer={this.state.performer} inputChange={this.inputChange} controlField={this.state.guessField} score={this.state.score} setScore={this.setScore}/>
          :  <MyButton onClick={this.gameOn} color='secondary' buttonText='GAME ON'/>
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
