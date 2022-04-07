import { FETCH_QUESTIONS } from '../action';

const INITIAL_STATE = [];

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_QUESTIONS:
    return (action.questions);
  default:
    return state;
  }
};

export default questions;
