import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchQuestion } from '../redux/action';
import './buttonColor.css';
import Cronometer from './Cronometer';

const CORRECT_ANSWER = 'correct-answer';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      ind: 0,
      answered: false,
      indice: 0,
      isBtnDisabled: false,
      nextBtn: false,
    };
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
    this.validationSecond();
  }

  // componentDidUpdate() {
  //   const { questions, history } = this.props;
  //   if (questions === []) { history.push('/feedback'); }
  // }

  getButtonColor = () => {
    this.setState(() => ({ answered: true }), this.validationNext);
  }

  nextQuestion = () => {
    const { indice } = this.state;
    const { history } = this.props;
    const magicNumber = 4;
    console.log(indice);
    if (indice === magicNumber) {
      history.push('/feedback');
    } else {
      this.setState((prevState) => ({
        indice: prevState.ind + 1,
        ind: prevState.ind + 1,
      }));

      this.setState(() => ({
        answered: false,
        isBtnDisabled: false,
        nextBtn: false,
      }));

      clearTimeout(this.timer);
      this.validationSecond();
    }
  }

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

  validationSecond = () => {
    const trintaMil = 30000;
    this.timer = setTimeout(() => this.setState({
      isBtnDisabled: true,
      nextBtn: true,
    }), trintaMil);
  }

  validationNext = () => {
    this.setState({ nextBtn: true });
  }

  render() {
    const { questions } = this.props;
    const { indice, answered, isBtnDisabled, nextBtn } = this.state;
    return (
      <>
        {
          questions.filter((obj, index) => index === indice).map((question) => (
            <div key={ question.question }>
              <h2 data-testid="question-category">{ question.category }</h2>
              <h3 data-testid="question-text">{ question.question }</h3>
              <div data-testid="answer-options">
                { this.allAnswers(question.incorrect_answers, question.correct_answer)
                  .map((incAnswer, index) => (
                    <button
                      key={ incAnswer.answer }
                      className={ answered ? incAnswer.type : null }
                      type="button"
                      disabled={ isBtnDisabled }
                      onClick={ () => this.getButtonColor() }
                      data-testid={ this.verifiAnswer(incAnswer.type, index) }
                    >
                      { incAnswer.answer }
                    </button>
                  ))}
                <div>
                  { nextBtn
                    ? (
                      <button
                        type="button"
                        data-testid="btn-next"
                        onClick={ this.nextQuestion }
                      >
                        Próximo
                      </button>)
                    : ''}
                </div>
              </div>
              <Cronometer />
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
