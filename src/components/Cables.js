// import React from 'react';
// import { ActionCable } from 'react-actioncable-provider'
//
// import ChatInput from './ChatInput'
//
// export default class Cables extends React.Component{
//
//   state = {
//     user: {},
//     message: ''
//   }
//
//   componentDidMount(){
//     this.setState({user: this.props.currentUser})
//   }
//
//
//
//   onReceived = (e) => {
//     console.log(e)
//     this.props.createMessage(e.message.message)
//   }
//
//   sendMessage = () => {
//     const postUser = () => {
//       if(this.props.currentUser.username){
//         return this.props.currentUser
//       } else {
//         return {username: `Anonymous`}
//       }
//     }
//
//     const postMessage = this.state.message
//     console.log(postUser)
//     const message = {user: postUser(), message: postMessage}
//     this.refs.ChatChannel.perform('onChat', {message})
//     this.setState({message: ''})
//   }
//
//
//   handleInput = (event) => {
//     const value = event.target.value
//     this.setState({message: value})
//   }
//
//   render(){
//     return(
//       <div>
//       <ActionCable
//         ref='ChatChannel'
//         channel={{channel: 'ChatChannel'}}
//         onReceived={this.onReceived}
//        />
//        <ChatInput sendMessage={this.sendMessage} handleInput={this.handleInput} value={this.state.message}/>
//         </div>
//     );
//   }
// }
