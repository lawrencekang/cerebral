import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
// import { mapStateToProps, mapDispatchToProps } from './store/index'
import chatReducer from './store/reducer';
import PropTypes from 'prop-types';
import { getQuestions } from './store/actions'
import configureStore from './store/index';


const store = configureStore();

store.dispatch(getQuestions());

const ChatWindow = message => (
  <div>{message}</div>
)

const ChatInput = ({handleInput, value}) => (
  <div>
    <input type="text" value={value} onChange={(event)=>handleInput(event.target.value)}/>
  </div>
)

ChatInput.propTypes = {
  handleInput: PropTypes.func,
  value: PropTypes.string
}

ChatInput.defaultProps = {
  handleInput: (value) => console.info(value)
}


// class ChatInput extends React.Component {
//   constructor(props){
//     super(props);
//   }
//   render() {
//     return <input id='chat-input' ref='input' {...this.props} type='text'/>;
//   }
// }

// class ChatInput extends React.Component {
//   constructor(props){
//     super(props);
//   }
//   render() {
//     return <input id='chat-input' ref='input' {...this.props} type='text'/>;
//   }
// }


ReactDOM.render(
  // <Provider store={store}>
    <ChatInput/>,
    // </Provider>,
  document.getElementById('react')
);
