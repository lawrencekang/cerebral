import * as actionTypes from './actionTypes';

const initialState = {
  questions: [],
  currentQuestion: null
}

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.questions
      })
  }
}
