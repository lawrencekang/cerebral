import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { showResponses } from '../store/actions'

const mapStateToProps = state => {
  return {
    conversation: state.conversation,
    agentTyping: state.agentTyping
  }
}

const mapDispatchToProps = dispatch => {
  return {
    triggerShowResponses: () => {
      dispatch(showResponses())
    }
  }
}

let ChatWindow = ({conversation, agentTyping, triggerShowResponses}) => (
  <div>
    {conversation.map((statement, index) => {
      if (statement.answers) {
        console.log("STATEMENT RESPONSES", statement.answers, statement.text, statement.text.map((answeredQuestion, index) => {
          
          <div key={index}>{answeredQuestion.question}</div>
          }
        ))
      }

      if (statement.answers === false) {
        return (
          <div key={index}>
            <span>{ statement.text }</span>
            <span>{ statement.speaker }</span>
            <span>{ statement.timestamp }</span>
          </div>
          )
      } else {
        return statement.text.map((answeredQuestion, index) => {
          
          return (<div key={index}><span>{answeredQuestion.question}</span><span>{answeredQuestion.answer}</span></div>)
          }
        )
        
      }    
    })}
      
    { agentTyping &&
      <div>
        <p>The onboarding assistant is typing</p>
      </div>
    }
    <button onClick={() => triggerShowResponses()}>Show Responses</button>
  </div>
)

ChatWindow.propTypes = {
  triggerShowResponses: PropTypes.func, 
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      speaker: PropTypes.string,
      text: PropTypes.oneOfType([PropTypes.string.isRequired,PropTypes.array]),
      timestamp: PropTypes.string,
      answers: PropTypes.boolean
    })
  )
}

ChatWindow = connect(mapStateToProps, mapDispatchToProps)(ChatWindow)

export default ChatWindow
