import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import configureStore from './store/index'
import ChatWindow from './components/ChatWindow.jsx'
import ChatBar from './components/ChatBar.jsx'
import { getQuestions } from './store/actions'

const store = configureStore();

class ChatWrapper extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    store.dispatch(getQuestions())
  }
  render() {
    return (
      <React.Fragment>
        <ChatWindow/>
        <ChatBar/>
      </React.Fragment>
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
