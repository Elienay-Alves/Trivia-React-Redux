import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchQuestion } from '../redux/action';
import './buttonColor.css';

const CORRECT_ANSWER = 'correct-answer';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      ind: 0,
      answered: false,
      indice: 0,
    };
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  getButtonColor = () => {
    this.setState(() => ({ answered: true }));
  }

  nextQuestion = () => {
    const seconds = 500;
    setTimeout(() => this.setState((prevState) => ({
      indice: prevState.ind + 1,
    })), seconds);
    this.setState((prevState) => ({ ind: prevState.ind + 1 }));
    this.setState(() => ({ answered: false }));
  };

  allAnswers = (incAnswers, corAnswer) => {
    const numberRandom = 0.5;
    const quests = incAnswers.map((answer) => {
      const objAnswer = {
        answer,
        type: 'wrong-answer',
      };
      return objAnswer;
    });
    quests.push({
      answer: corAnswer,
      type: CORRECT_ANSWER,
    });
    const shuffle = quests.sort(() => Math.random() - numberRandom);
    return (shuffle);
  }

  verifiAnswer = (answer, index) => {
    if (answer === CORRECT_ANSWER) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  render() {
    const { questions } = this.props;
    const { indice, answered } = this.state;
    return (
      <>
        {
          questions.filter((obj, index) => index === indice).map((question) => (
            <div key={ question.question }>
              <h2 data-testid="question-category">{ question.category }</h2>
              <h3 data-testid="question-text">{ question.question }</h3>
              <div
                data-testid="answer-options"
              >
                {
                  this.allAnswers(question.incorrect_answers, question.correct_answer)
                    .map((incAnswer, index) => (
                      <button
                        key={ incAnswer.answer }
                        className={ answered ? incAnswer.type : null }
                        type="button"
                        data-testid={ this.verifiAnswer(incAnswer.type, index) }
                        onClick={ () => this.getButtonColor() }
                      >
                        { incAnswer.answer }
                      </button>
                    ))
                }
              </div>
              <button type="button" onClick={ this.nextQuestion }>Próximo</button>
            </div>
          ))
        }
      </>
    );
  }
}
Question.propTypes = {
  token: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object),
}.isRequired;
const mapStateToProps = (state) => ({
  token: state.token,
  questions: state.questions,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: () => dispatch(actionFetchQuestion()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Question);
