import React,  { Component } from 'react'
import { ActionCable } from 'react-actioncable-provider'

import GameView from './GameView'

import MessageInput from './MessageInput'
import MyButton from '../MaterialComponents/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import TimeBar from '../MaterialComponents/TimeBar'
import TopicSelect from '../MaterialComponents/TopicSelect'

export default class GameContainer extends Component {

  state = {
    score: 0,
    answer: '',
    round: 1,
    gameOn: false,
    performer: 0,
    guessField: '',
    gameObject: {},
    snackbarOpen: false,
    snackbarMessage: "",
    topicId: 0,
    topicSelectOpen: false
  }

  componentDidMount() {
    this.snackbarSend('Press "Game On" to begin!')
  }

  topicClickOpen = () => {
    this.setState({ topicSelectOpen: true });
  };

  topicClickClosed = (topic) => {
    // console.log(topic)
    this.setState({ topicSelectOpen: false, topicId: topic });
    this.gameOn(topic)
  };

  snackbarClose = () => {
    this.setState({snackbarOpen: false})
  }

  snackbarSend = snackbarMessage => {
    // this.setState({snackbarMessage, snackBarOpen: true})
    this.setState({snackbarOpen: true, snackbarMessage})
  }

  // Controlled Field For Guess
  inputChange = (e) => {
    const value = e.target.value
    this.setState({guessField: value})
    // this.props.handleInput({message: value})
  }

  // When called, activates the game mode
  gameOn = (topicId) => {
    this.setState({
      gameOn: true,
      topicId: topicId
    })
      // The component updates before the fetch, but we don't want to send the game object before we have the data
    fetch(`http://localhost:3000/games`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify({game: {topic_id: topicId}})
    }).then(r=>r.json()).then(resp => {
      const gameObj = {
      answer: resp.prompts[0].name,
      gameObject: resp,
      gameOn: true,
      topicId: this.state.topicId,
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

    // console.log('dataReceived before stateset', e.game_data)

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

  setScore = (e) => {
    e.preventDefault()
    const guess = e.target.guess.value
    const answer = this.state.answer
    const performer = this.props.currentUser.id
    // this.sendMessage({user: {username: `${this.props.currentUser.username}'s Guess`}, message: guess})
    this.props.sendMessage({user: {username: `${this.props.currentUser.username}'s guess`}, message: guess})
    this.gameDigest(guess, answer, performer)
  }

  gameDigest = (guess, answer, performer) => {
    // console.log('Game digest', this.state)
    if (this.checkRoundInner()){
      const gameHash = {performer: performer, score: this.state.score + 1, round: this.state.round + 1, answer: ''}
      this.sendScore(gameHash)
      // performer === this.props.setCurrentUser.id ? this.snackbarSend(`Your turn to guess!`) : this.snackbarSend(`Go!`)
    } else if (guess.toLowerCase() === answer.toLowerCase()){
      const gameHash = {performer: performer, score: this.state.score + 1, round: this.state.round + 1, answer: this.state.gameObject.prompts[this.state.round].name, gameObject: this.state.gameObject}
      this.sendScore(gameHash)
      // this.setState({snackMessage: 'Correct!'})
      this.snackbarSend(`Correct!`)
    } else {
      this.snackbarSend('Sorry, try again!')
    }
    this.setState({guessField: ''})
  }

  sendScore = (gameHash) => {
    this.refs.ScoreChannel.perform('onGameChange', {gameHash})
    // console.log(gameHash)
    this.setState({message: ''})
  }

  checkRound = () => {
    return this.state.round > 10
  }

  checkRoundInner = () => {
    return this.state.round >= 10
  }


    // Thus, the game ends
  endGame = () => {
    const gameID = this.state.gameObject.id
    const score = this.state.score
    this.snackbarSend(`Game over! You scored ${this.state.score} points!`)
    this.setState({
      round: 1,
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
    }).then(r=>r.json())
  }

  render() {
    // console.log(this.state)
    return (
      <div className='game-box'>
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
            autoHideDuration={1500}
            message={this.state.snackbarMessage}
            id={"snackbar"}
            TransitionComponent={Fade}
          />
        </div>

        {this.state.gameOn
          ? <MessageInput createMessage={this.props.createMessage} answer={this.state.answer} currentUser={this.props.currentUser} performer={this.state.performer} inputChange={this.inputChange} controlField={this.state.guessField} score={this.state.score} setScore={this.setScore}/>
          :  <MyButton onClick={this.topicClickOpen} color='secondary' buttonText='GAME ON'/>
        }
        { this.state.gameOn ?
          <div>
        <h3>
          Score: {this.state.score}
        </h3>
        <TimeBar endGame={this.endGame}/>
      </div>
        :
        ''}
        <TopicSelect topics={this.props.topics}open={this.state.topicSelectOpen} topicClickClosed={this.topicClickClosed}/>
      </div>
    )
  }
}
