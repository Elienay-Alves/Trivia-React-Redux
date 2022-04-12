export const SUBMIT = 'SUBMIT';
export const TOKEN = 'TOKEN';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const login = (value) => ({ type: SUBMIT, value });

export const getToken = (value) => ({ type: TOKEN, token: value });

export const setQuestions = (value) => ({ type: FETCH_QUESTIONS, questions: value });

export const actionFetchQuestion = () => async (dispatch, getState) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getState().token}`);
  const data = await response.json();
  dispatch(setQuestions(data.results));
};

export const actionUpdateScore = (value) => ({ type: UPDATE_SCORE, value });
