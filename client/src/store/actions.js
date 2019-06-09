import axios from 'axios';
import * as actionTypes from './actionTypes'

const WPM = 60 // used to set delay on doctor 'typing'

// Simple action creators
function nextQuestion(activeQuestionIndex) {
  return (dispatch, getState) => {
    dispatch(setAgentTyping(true))
    let state = getState()
    let terminal = false;
    let activeQuestion = state.questions[activeQuestionIndex]
    if (activeQuestion.paths == undefined) {
      terminal = true;
    }
    dispatch(delayedAppend(state.agent, activeQuestion.question, terminal))
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

function setAgentTyping(value){
  return {
    type: actionTypes.SET_AGENT_TYPING,
    value
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

function enableShowResponses() {
  return {
    type: actionTypes.ENABLE_SHOW_RESPONSES
  }
}

// Thunks

function delayedAppend(speaker, text, terminal) {
  // to mimic actual typing times, set a delay for a time based on the length of the response.
  let delay = 1000;
  if (!Array.isArray(text)) {
    let words = text.split(" ").length
    delay = words/WPM * 250 * 60
  }
  return (dispatch) => {
    setTimeout(function() {
      dispatch(setAgentTyping(false));
      dispatch(appendToConversation(speaker, text))
      if (!terminal) {
        dispatch(enableSubmit());
      }
    }, delay)
  }
}

function appendToConversation(speaker, text) {
  let answers = false
  if (Array.isArray(text)) {
    answers = true
  }
  let date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let z = "am"
  if (hours > 12) {
    hours -= 12
    z = "pm"
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  return {
    type: actionTypes.APPEND_TO_CONVERSATION,
    speaker: speaker.name,
    speakerType: speaker.type,
    text,
    timestamp: `${hours}:${minutes} ${z}`,
    answers
  }  
}

function getPath(state, chatInput) {
  let paths = state.questions[state.activeQuestionIndex].paths
  let pathType = Array.isArray(paths) ? 'array' : typeof paths
  switch (pathType) {
    case 'undefined':
      // not sure if this is ever used
      return undefined
    case 'number':
      return paths > 0 ? paths : 0
    case 'object':
      const formattedInput = chatInput.toLowerCase()
      return paths[formattedInput] > 0 ? paths[formattedInput] : 0
  }
}

/**
 * validAnswer() returns a boolean based on whether the current chatInput
 * passes the validation required in the current activeQuestion
 * TODO: replace special characters (e.g. punctuation) when validating against string values.
 */
function validAnswer(state) {
  //  handle the case where we're using the "-1" question index
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
        return `${randomPrompt}  Format your answer as MM/DD/YYYY.`
      } else if (activeQuestion.question.indexOf('password') > -1) {
        return `Your password should be at least six characters in length.`
      }
  } 
}

function agentResponse(answerIsValid, chatInput){
  return function(dispatch, getState) {
    dispatch(setAgentTyping(true))
    const state = getState()
    if (answerIsValid === true) {
      let path = getPath(state, chatInput);
      if (path != undefined) {
        dispatch(setActiveQuestionIndex(path))
        dispatch(nextQuestion(path))
      } 
    } else if (answerIsValid === false) {
        // Invalid answer, prompt user with hints
        const helperPrompt = getHelperPrompt(state)
        dispatch(appendToConversation(state.agent, helperPrompt))
        dispatch(enableSubmit())
        dispatch(setAgentTyping(false))
    }
  }
}

function validateInput(obscureText) {
  return (dispatch, getState) => {
    const state = getState()
    let chatInput = state.chatInput;
    if (obscureText) {
      chatInput = '(Hidden for your security).'
    }
    dispatch(disableSubmit());
    dispatch(appendToConversation(state.user, chatInput))
    const answerIsValid = validAnswer(state)
    if (answerIsValid) {
      dispatch(setAnswerOnQuestion())
      dispatch(updateInput(''))
      if (state.showResponsesDisabled) {
        dispatch(enableShowResponses())
      }
    } else {
      dispatch(updateInput(''))
    }
    setTimeout(()=>{
      dispatch(agentResponse(answerIsValid, chatInput))
    }, Math.floor(Math.random() * Math.floor(1.5, 4) * 1000))
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

function formatResponses(answeredQuestions) {
  let answers = []
  for (var i = 0; i < answeredQuestions.length; i++) {
    let item = answeredQuestions[i];
    answers.push({
      question: item.question,
      answer: item.answer
    })
  }
  return answers
}

function showResponses() {
  return (dispatch, getState) => {
    const state = getState();
    const answeredQuestions = state.questions.filter((item) => {
      return !!item.answer
    })
    if (answeredQuestions.length) {
      dispatch(appendToConversation(state.agent, "Here's how you've answered the questions so far."))
      dispatch(delayedAppend(state.agent, formatResponses(answeredQuestions)))
    }
  }
}

function connectToWebsocket() {
  return (dispatch, getState) => {
    const socket = new WebSocket('wss://echo.websocket.org');
    socket.addEventListener('open', event => {
      alert("Socket opened!")
  });
  }
}

export {
  disableSubmit,
  enableSubmit,
  getQuestions,
  showResponses,
  updateInput,
  validateInput,
  appendToConversation,
  connectToWebsocket
}
