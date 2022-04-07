import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import token from './tokenReducer';
import questions from './questionsReducer';

const rootReducer = combineReducers({
  loginReducer,
  token,
  questions,
});

export default rootReducer;
