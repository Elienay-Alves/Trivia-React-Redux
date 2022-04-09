import { setQuestions } from '../redux/action';

const fetchQuestions = async (dispatch, token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=1&token=${token}`);
  const data = await response.json();
  dispatch(setQuestions(data.results));
  console.log(data.results);
};

export default fetchQuestions;
