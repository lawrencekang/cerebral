import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import chatReducer from './store/reducer';
import PropTypes from 'prop-types';
import { getQuestions } from './store/actions'
import configureStore from './store/index';
import VisibleChatWindow from './components/ChatWindow.jsx';

const store = configureStore();

// store.dispatch(getQuestions());


// const ChatInput = ({handleInput, value}) => (
//   <div>
//     <input type="text" value={value} onChange={(event)=>handleInput(event.target.value)}/>
//   </div>
// )

// ChatInput.propTypes = {
//   handleInput: PropTypes.func,
//   value: PropTypes.string
// }

// ChatInput.defaultProps = {
//   handleInput: (value) => console.info(value)
// }



ReactDOM.render(
  <Provider store={store}>
    <VisibleChatWindow/>
  </Provider>,
  document.getElementById('react')
);
