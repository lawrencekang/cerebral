import axios from 'axios';
import * as actionTypes from './actionTypes'

function requestQuestions() {
  return {
    type: actionTypes.REQUEST_QUESTIONS
  }
}

function receiveQuestions(questions) {
  return {
    type: actionTypes.RECEIVE_QUESTIONS,
    questions
  }
}

function getQuestions() {
  return dispatch => {
    dispatch(requestQuestions)
    const questionsUrl = 'https://gist.githubusercontent.com/pcperini/97fe41fc42ac1c610548cbfebb0a4b88/raw/cc07f09753ad8fefb308f5adae15bf82c7fffb72/cerebral_challenge.json'
    return axios.get(questionsUrl)
              .then(response=>{
                console.log("RESPONSE", response);
                dispatch(receiveQuestions(response.data))
              })
              .catch(error=>{

              })
  }
}


export {
  getQuestions
}
