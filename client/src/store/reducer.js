import * as actionTypes from './actionTypes';

const initialState = {
  questions: [],
  activeQuestionIndex: null,
  chatInput: '',
  conversation: [],
  agentTyping: false,
  submitDisabled: true,
  user: {
    name: null,
    type: 'user'
  },
  doctor: {
    name: 'Dr. Frontier',
    type: 'doctor'
  },
  invalidAnswerPrompts: [
    `I didn't quite get that.`,
    `I'm not sure about that.`,
    `Can you try again?`,
    `Try your answer again.`
  ]
}

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_QUESTION_INDEX:
      return Object.assign({}, state, {
        activeQuestionIndex: action.activeQuestionIndex
      })
    case actionTypes.RECEIVE_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.questions
      })
    case actionTypes.APPEND_TO_CONVERSATION:
      return Object.assign({}, state, {
        conversation: [
          ...state.conversation,
          {
            speaker: action.speaker,
            text: action.text,
            timestamp: action.timestamp,
            answers: action.answers
          }
        ]
      })
    case actionTypes.SET_CHAT_INPUT:
      return Object.assign({}, state, {
        chatInput: action.chatInput
      })
    case actionTypes.SET_ANSWER_ON_QUESTION:
      return Object.assign({}, state, {
        questions: state.questions.map((question, index) => {
          if (index === state.activeQuestionIndex) {
            return Object.assign({}, question, {
              answer: state.chatInput
            })
          }
          return question
        })
      })
    case actionTypes.SET_AGENT_TYPING:
      return Object.assign({}, state, {
        agentTyping: action.value
      })
    case actionTypes.ENABLE_SUBMIT:
      return Object.assign({}, state, {
        submitDisabled: false
      })
    case actionTypes.DISABLE_SUBMIT:
      return Object.assign({}, state, {
        submitDisabled: true
      })
    default:
      return state
  }
}
