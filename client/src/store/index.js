import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import chatReducer from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
  const store = createStore(
    chatReducer,
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
      )
    ) 
  )
  return store
}  



