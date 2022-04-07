import { TOKEN } from '../action/index';

const INITIAL_STATE = {
  token: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN:
    return (action.token);
  default:
    return state;
  }
};

export default token;
