import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { disableSubmit, enableSubmit, updateInput, validateInput } from '../store/actions'

const mapChatInputState = state => {
  return {
    chatInput: state.chatInput
  }
}

const mapChatInputDispatch = dispatch => {
  return {
    handleInput: inputValue => {
      dispatch(updateInput(inputValue))},
    handleKeyPress: event => {
      if (event.key=="Enter") {
        dispatch(disableSubmit())
        dispatch(validateInput(null))
      }
    }
  }
}

let ChatInput = ({ chatInput, handleInput, handleKeyPress }) => (
  <input
    value={chatInput}
    onChange={(event)=>handleInput(event.target.value)}
    onKeyPress={(event)=>handleKeyPress(event)}></input>
)

ChatInput.propTypes = {
  chatInput: PropTypes.string,
  handleInput: PropTypes.func,
  handleKeyPress: PropTypes.func
}

ChatInput = connect(mapChatInputState, mapChatInputDispatch)(ChatInput)

let ChatButton = ({ validateInput }) => (
  <button onClick={()=>validateInput(new Date().toDateString())}>Send</button>
)

ChatButton.propTypes = {
  validateInput: PropTypes.func
}

const mapChatButtonDispatch = dispatch => {
  return {
    validateInput: (timestamp) => {
      dispatch(validateInput(timestamp))
    }
  }
}

ChatButton = connect(null, mapChatButtonDispatch)(ChatButton)

const ChatBar = () => (
  <div>
    <ChatInput/><ChatButton/>
  </div>
)



export default ChatBar
