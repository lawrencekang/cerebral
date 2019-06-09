import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import configureStore from './store/index'
import ChatWindow from './components/ChatWindow.jsx'
import ChatBar from './components/ChatBar.jsx'
import { appendToConversation, getQuestions } from './store/actions'
import './styles/cerebralStyles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();

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
      <div className="container">
        <ChatWindow/>
        <ChatBar/>
      </div>
    )
  }
}

ChatWrapper = connect(null, null)(ChatWrapper)

ReactDOM.render(
  <Provider store={store}>
    <ChatWrapper>
    </ChatWrapper>
  </Provider>,
  document.getElementById('react')
);
