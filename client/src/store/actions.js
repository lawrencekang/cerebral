import axios from 'axios';
import * as actionTypes from './actionTypes'


function nextQuestion(activeQuestionIndex) {
  return (dispatch, getState) => {
    let state = getState()
    let activeQuestion = state.questions[activeQuestionIndex]
    dispatch(appendToConversation(state.doctor.name, activeQuestion.question, null))
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
  console.log("UPDATEINPUTETETET", inputValue);
  return {
    type: actionTypes.SET_CHAT_INPUT,
    chatInput: inputValue
  }
}

function appendToConversation(speaker, text, timestamp) {
  return {
    type: actionTypes.APPEND_TO_CONVERSATION,
    speaker,
    text,
    timestamp
  }
}

function getPath(state) {
  // debugger;
  let paths = state.questions[state.activeQuestionIndex].paths
  let pathType = Array.isArray(paths) ? 'array' : typeof paths
  switch (pathType) {
    case 'undefined':
      return undefined
    case 'number':
      return paths > 0 ? paths : 0
    case 'object':
      return paths[state.chatInput] > 0 ? paths[state.chatInput] : 0
  }
}

/**
 * validAnswer() returns an object based on whether the current chatInput
 * passes the validation required in the current activeQuestion
 */
function validAnswer(state) {
  //  handle the case where we're using the "-1" question index
  let activeQuestionIndex = state.activeQuestionIndex > 0 ? state.activeQuestionIndex : 0;
  let activeQuestion = state.questions[activeQuestionIndex]
  let currentInput = state.chatInput
  let validation = activeQuestion.validation;
  const validationType = Array.isArray(validation) ? 'array' : typeof validation
  
  switch (validationType) {
    case 'array':
      console.log("ARRAY")
      if (validation.indexOf(currentInput.toLowerCase()) > -1) {
        return true
      } else {
        return false
      } 
    case 'string':
        console.log("STRING")
      let regexTest = RegExp(validation);
      console.log(regexTest.test(currentInput))
      if (regexTest.test(currentInput)){
        return true
      } else {
        return false
      }
    case 'boolean':
        console.log("BOOL")
      return true
  }
}

function invalidAnswer() {

}

function validateInput(timestamp) {
  return (dispatch, getState) => {
    let state = getState()

    dispatch(appendToConversation(state.user.name, state.chatInput, timestamp))
    

    if (validAnswer(state)) {
      dispatch(setAnswerOnQuestion())
      dispatch(updateInput(''))
      console.log("ANSEWR WAS VALID?")
      let path = getPath(state);
      console.log("PATH", path);
      if (path != undefined) {
        dispatch(setActiveQuestionIndex(path))
        dispatch(nextQuestion(path))
      } else {
        // TODO: handle endstate
      }
      
    }
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
  getQuestions,
  updateInput,
  validateInput
}
