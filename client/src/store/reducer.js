import * as actionTypes from './actionTypes';

const initialState = {
  questions: [],
  activeQuestion: null,
  conversation: [{
    text:'hello',
    speaker: 'me',
    timestamp: new Date().toDateString()
  }],
  user: {
    name: null,
    type: 'user'
  },
  doctor: {
    name: 'Dr. Frontier',
    type: 'doctor'
  }
}

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.questions
      })
    case actionTypes.SET_ACTIVE_QUESTION:
      return Object.assign({}, state, {
        activeQuestion: action.questionNumber
      })
    case actionTypes.APPEND_TO_CONVERSATION:
      return Object.assign({}, state, {
        conversation: [
          ...state.conversation,
          {
            speaker: action.speaker,
            text: action.text,
            timestamp: action.timestamp
          }
        ]
      })
    default:
      return state
  }
}
