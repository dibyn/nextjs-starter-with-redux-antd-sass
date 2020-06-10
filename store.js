import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import { CURRENT_URL } from './types'
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}
export const changedUrl = (url) => {
  return {
    type: CURRENT_URL,
    data: url,
  }
}
export const changeUrl = (url) => {
  return (dispatch) => {
    dispatch(changedUrl(url))
  }
}
export const urlReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_URL:
      return {
        ...action.data,
      }
    default:
      return state
  }
}
const combinedReducer = combineReducers({
  urlReducer,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]))
}
export const wrapper = createWrapper(initStore)
