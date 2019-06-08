import axios from 'axios';
import * as actionTypes from './actionTypes'

const WPM = 40 // used to set delay on doctor 'typing'

function nextQuestion(activeQuestionIndex) {
  return (dispatch, getState) => {
    let state = getState()
    let activeQuestion = state.questions[activeQuestionIndex]
    dispatch(delayedAppend(state.doctor.name, activeQuestion.question, null))
  }
}

function setActiveQuestionIndex(activeQuestionIndex) {
  return {
    type: actionTypes.SET_ACTIVE_QUESTION_INDEX,
    activeQuestionIndex
  }
}

function setAnswerOnQuestion(){
  return {
    type: actionTypes.SET_ANSWER_ON_QUESTION
  }
}

function receiveQuestions(questions) {
  return {
    type: actionTypes.RECEIVE_QUESTIONS,
    questions
  }
}

function updateInput(inputValue) {
  return {
    type: actionTypes.SET_CHAT_INPUT,
    chatInput: inputValue
  }
}

function delayedAppend(speaker, text) {
  return (dispatch, state) => {
    setTimeout(function() {
      dispatch(appendToConversation(speaker, text))
    }, 1000)
  }
}

function appendToConversation(speaker, text) {
  // to mimic actual typing times, set a delay for a time based on the length of the response.
  // let words = text.split(" ").length
  // let delay = words/WPM * 60 * 1000

  return {
    type: actionTypes.APPEND_TO_CONVERSATION,
    speaker,
    text,
    timestamp: new Date().toDateString()
  }

  // console.log("APPENDING?");
  // setTimeout(function() {
    
  // }, Math.floor(math))


  
}

function getPath(state) {
  let paths = state.questions[state.activeQuestionIndex].paths
  let pathType = Array.isArray(paths) ? 'array' : typeof paths
  switch (pathType) {
    case 'undefined':
      // not sure if this is ever used
      return undefined
    case 'number':
      return paths > 0 ? paths : 0
    case 'object':
      const formattedInput = state.chatInput.toLowerCase()
      return paths[formattedInput] > 0 ? paths[formattedInput] : 0
  }
}

/**
 * validAnswer() returns a boolean based on whether the current chatInput
 * passes the validation required in the current activeQuestion
 */
function validAnswer(state) {
  //  handle the case where we're using the "-1" question index
  // let activeQuestionIndex = state.activeQuestionIndex > 0 ? state.activeQuestionIndex : 0;
  let activeQuestion = state.questions[state.activeQuestionIndex]
  let currentInput = state.chatInput
  let validation = activeQuestion.validation;
  const validationType = Array.isArray(validation) ? 'array' : typeof validation
  
  switch (validationType) {
    case 'array':
      if (validation.indexOf(currentInput.toLowerCase()) > -1) {
        return true
      } else {
        return false
      } 
    case 'string':
      let regexTest = RegExp(validation);
      if (regexTest.test(currentInput)){
        return true
      } else {
        return false
      }
    case 'boolean':
      return validation ? validation : undefined // using undefined for terminal validation
  }
}

function getHelperPrompt(state) {
  const activeQuestion = state.questions[state.activeQuestionIndex]
  const validation = activeQuestion.validation
  const validationType = Array.isArray(validation) ? 'array' : typeof validation
  const randomInvalidPromptIndex = Math.floor(Math.random() * Math.floor(state.invalidAnswerPrompts.length))
  const randomPrompt = state.invalidAnswerPrompts[randomInvalidPromptIndex]
  switch (validationType) {
    case 'array':
      return `${randomPrompt}  Please answer "${validation.join('," or "')}."`
    case 'string':
      if (activeQuestion.question.indexOf('email') > -1) {
        return `I was looking for an email address, can you check the format and try again?`
      } else if (activeQuestion.question.indexOf('born') > -1) {
        return `${randomPrompt}.  Can you format your answer as MM/DD/YYYY?`
      } else if (activeQuestion.question.indexOf('password') > -1) {
        return `Your password should be at least six characters in length.`
      }
  } 

}

function validateInput(timestamp) {

    return (dispatch, getState) => {
      let state = getState()
      dispatch(appendToConversation(state.user.name, state.chatInput, timestamp))
      const answerIsValid = validAnswer(state)
      if (answerIsValid === true) {
        dispatch(setAnswerOnQuestion())
        dispatch(updateInput(''))
        let path = getPath(state);
        if (path != undefined) {
          dispatch(setActiveQuestionIndex(path))
          dispatch(nextQuestion(path))
        } else {
          // TODO: handle endstate
          debugger;
        }
      } else if (answerIsValid === false) {
          // Invalid answer
          const helperPrompt = getHelperPrompt(state)
          dispatch(appendToConversation(state.doctor.name, helperPrompt, new Date().toDateString()))
          dispatch(updateInput(''))
      } else {
          // handle terminal case
      }
    }

}

function disableSubmit() {
  return {
    type: actionTypes.DISABLE_SUBMIT
  }
}

function enableSubmit() {
  return {
    type: actionTypes.ENABLE_SUBMIT
  }
}

function getQuestions() {
  return dispatch => {
    const questionsUrl = 'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json'
    return axios.get(questionsUrl)
              .then(response=>{
                dispatch(receiveQuestions(response.data))
                dispatch(setActiveQuestionIndex(1))
                dispatch(nextQuestion(1))
              })
              .catch(error=>{
              })
  }
}

export {
  disableSubmit,
  enableSubmit,
  getQuestions,
  updateInput,
  validateInput
}
