import { combineReducers } from 'redux';
import player from './loginReducer';
import token from './tokenReducer';
import questions from './questionsReducer';

const rootReducer = combineReducers({
  player,
  token,
  questions,
});

export default rootReducer;
