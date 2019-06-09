import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { disableSubmit, updateInput, validateInput } from '../store/actions'

const mapChatInputState = state => {
  let question = ''
  if (state.questions.length && state.activeQuestionIndex) {
    question = state.questions[state.activeQuestionIndex].question
  }
  return {
    chatInput: state.chatInput,
    question
  }
}

const mapChatInputDispatch = dispatch => {
  return {
    handleInput: event => {
      // Passwords shouldn't be asked for in a chat app and put into a store without some sort of hashing; for demo purposes, the password is not hashed but is obscured.
      let inputValue = event.target.value
      if (event.target.getAttribute('type') === 'password') {
        inputValue = inputValue.replace(/./g, '*')
      }
      dispatch(updateInput(inputValue))},
    handleKeyPress: event => {
      if (event.key=='Enter') {
        let obscureText = false;
        if (event.target.getAttribute('type') === 'password'){
          obscureText = true;  
        }
        dispatch(disableSubmit())
        dispatch(validateInput(obscureText))
      }
    }
  }
}

let ChatInput = ({ chatInput, handleInput, handleKeyPress, question }) => (
  <input
    type={ question.indexOf("password") > -1 ? 'password' : 'text'}
    value={chatInput}
    onChange={(event)=>handleInput(event)}
    onKeyPress={(event)=>handleKeyPress(event)}></input>
)

ChatInput.propTypes = {
  question: PropTypes.string,
  chatInput: PropTypes.string,
  handleInput: PropTypes.func,
  handleKeyPress: PropTypes.func
}

ChatInput = connect(mapChatInputState, mapChatInputDispatch)(ChatInput)

let ChatButton = ({ validateInput, submitDisabled, chatInput }) => (
  <button
    onClick={()=>validateInput(new Date().toDateString())}
    disabled={
      submitDisabled || !chatInput
    }>Send</button>
)

ChatButton.propTypes = {
  chatInput: PropTypes.string,
  validateInput: PropTypes.func,
  submitDisabled: PropTypes.bool
}

const mapChatButtonState = state => {
  return {
    submitDisabled: state.submitDisabled,
    chatInput: state.chatInput
  }
}
const mapChatButtonDispatch = dispatch => {
  return {
    validateInput: (obscureText) => {
      dispatch(validateInput(obscureText))
    }
  }
}

ChatButton = connect(mapChatButtonState, mapChatButtonDispatch)(ChatButton)

const ChatBar = () => (
  <div>
    <ChatInput/><ChatButton/>
  </div>
)



export default ChatBar
