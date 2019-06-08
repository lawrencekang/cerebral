import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const mapStateToProps = state => {
  return {
    conversation: state.conversation
  }
}

const ChatWindow = ({conversation}) => (
  <div>
    {conversation.map((statement, index) => (
      <div key={index}>
        <span>{ statement.text }</span>
        <span>{ statement.speaker }</span>
        <span>{ statement.timestamp }</span>
      </div>
    ))}
  </div>
)


ChatWindow.propTypes = {
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      speaker: PropTypes.string,
      text: PropTypes.string.isRequired,
      timestamp: PropTypes.string
    })
  )
}

const VisibleChatWindow = connect(mapStateToProps, null)(ChatWindow)

export default VisibleChatWindow
