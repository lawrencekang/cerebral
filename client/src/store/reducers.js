import { SET_SEARCH_RESULTS, SET_MAP_BOUNDS } from './actionTypes'

const initialState = {
  searchResults: [],
  mapBounds: null
}

export default function mapStoreReducers(state = initialState, action) {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return Object.assign({}, state, {
        searchResults: action.result
      })
    case SET_MAP_BOUNDS:
      return Object.assign({}, state, {
        mapBounds: action.result
      })
    default:
      return state
  }
}