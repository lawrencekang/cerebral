import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import configureStore from './store/index'
import ChatWindow from './components/ChatWindow.jsx'
import ChatBar from './components/ChatBar.jsx'
import PropTypes from 'prop-types'
import { appendToConversation, getQuestions } from './store/actions'
import './styles/cerebralStyles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { showResponses } from './store/actions'

const store = configureStore();

const mapDispatchToProps = dispatch => {
  return {
    triggerShowResponses: () => {
      dispatch(showResponses())
    }

  }
}

class ChatWrapper extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    store.dispatch(appendToConversation(null, 'Hello!  Please give me a moment to set up.  In a moment, I\'ll be asking you a few questions to get you onboarded.', null))
    setTimeout(()=> {
      store.dispatch(getQuestions())
    }, 5000)
  }
  render() {
    return (
      <React.Fragment>
        <div id="background-top"></div>
        <div id='background-bottom'></div>
        <div className="container">
          <div className="row">
            <div id="chat-wrapper" className="col-6 offset-3">
              <ChatWindow/>
              <ChatBar/>
            </div>
          </div>
          <div className="row">
            <button onClick={() => triggerShowResponses()}>Show Responses</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

ChatWrapper.propTypes = {
  triggerShowResponses: PropTypes.func
}

ChatWrapper = connect(null, mapDispatchToProps)(ChatWrapper)

ReactDOM.render(
  <Provider store={store}>
    <ChatWrapper>
    </ChatWrapper>
  </Provider>,
  document.getElementById('react')
);
