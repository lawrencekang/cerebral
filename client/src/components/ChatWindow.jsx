import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  return {
    conversation: state.conversation,
    agentTyping: state.agentTyping
  }
}

let ChatWindow = ({conversation, agentTyping, triggerShowResponses}) => (
  <div id="conversation" className="row">
    <div className="col-12">
      {conversation.map((statement, index) => {
        if (statement.answers === false) {
          return (
            <div className="chat-statement row" key={index}>
              <div className="col-12">
                <div>{ statement.speaker }</div>
                <p>{ statement.text }</p>
                <div>{ statement.timestamp }</div>
              </div>
            </div>
            )
        } else {
          return statement.text.map((answeredQuestion, index) => {        
            return (<div className="row" key={index}><span>{answeredQuestion.question}</span><span>{answeredQuestion.answer}</span></div>)
            }
          )
          
        }    
      })}
    </div>
      
    { agentTyping &&
      <div className="agent-indicator row">
        <p>The onboarding assistant is typing</p>
      </div>
    }
    
  </div>
)

ChatWindow.propTypes = {
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      speaker: PropTypes.string,
      text: PropTypes.oneOfType([PropTypes.string.isRequired,PropTypes.array]),
      timestamp: PropTypes.string,
      answers: PropTypes.boolean
    })
  )
}

ChatWindow = connect(mapStateToProps, null)(ChatWindow)

export default ChatWindow
