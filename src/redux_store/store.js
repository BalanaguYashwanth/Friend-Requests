import {createStore} from 'redux'
import { user_pending_reducer } from './reducer'
import {applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    user_pending:user_pending_reducer
})

const store = createStore(
    allReducers,
    {},
    applyMiddleware(thunk)
)

store.subscribe(()=>{
    store.getState()
})


export {store}