import { SUBMIT } from '../action/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT:
    return {
      ...state,
      name: action.value.name,
      gravatarEmail: action.value.gravatarEmail,
    };
  default:
    return state;
  }
};

export default player;
