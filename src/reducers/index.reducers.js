import { combineReducers } from 'redux';
import userReducer from './user.reducers.js';
import usersReducer from './users.reducers.js';
import errorReducer from './error.reducers.js';


export default combineReducers({
  userReducer,
  usersReducer,
  errorReducer
});