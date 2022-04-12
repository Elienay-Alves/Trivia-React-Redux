import { SUBMIT, UPDATE_SCORE } from '../action/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT:
    return {
      ...state,
      name: action.value.name,
      gravatarEmail: action.value.gravatarEmail,
    };
  case UPDATE_SCORE:
    return { ...state,
      score: state.score + action.value,
      assertions: state.assertions + 1 };
  default:
    return state;
  }
};

export default player;
