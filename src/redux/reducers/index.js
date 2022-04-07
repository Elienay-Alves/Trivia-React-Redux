import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({
  loginReducer,
  token,
});

export default rootReducer;
