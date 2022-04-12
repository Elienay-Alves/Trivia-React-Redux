import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchQuestion, actionUpdateScore } from '../redux/action';
import './buttonColor.css';

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
      seconds: 30,
      shuffle: [],
    };
  }

  async componentDidMount() {
    const { fetchQuestions } = this.props;
    const second = 1000;

    await fetchQuestions();
    this.allAnswers();

    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }), () => {
        const { seconds } = this.state;
        if (seconds === 0) clearInterval(this.intervalID);
      });
    }, second);
  }

  componentDidUpdate(_prevProp, prevState) {
    const { isAnswered, answered, seconds, indice, isBtnDisabled } = this.state;

    if (answered && !isAnswered) {
      this.setState({ isAnswered: true });
      clearInterval(this.intervalID);
    }

    if (seconds === 0 && !isBtnDisabled) {
      this.setState({ isBtnDisabled: true, nextBtn: true });
    }

    if (prevState.indice !== indice) this.allAnswers();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getButtonColor = (answer, difficult) => {
    const { dispatchScore } = this.props;
    this.setState(({ answered: true,
      isBtnDisabled: true,
      nextBtn: true }), () => {
      if (answer === CORRECT_ANSWER) {
        dispatchScore(this.points(difficult));
      }
    });
  }

  points = (difficult) => {
    const { seconds } = this.state;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const ten = 10;
    if (difficult === 'hard') {
      return ten + (seconds * hard);
    } if (difficult === 'medium') {
      return ten + (seconds * medium);
    } if (difficult === 'easy') {
      return ten + (seconds * easy);
    }
  }

  nextQuestion = () => {
    const { indice } = this.state;
    const { history } = this.props;
    const magicNumber = 4;
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
    }
  }

  allAnswers = () => {
    const { questions } = this.props;
    const { indice } = this.state;
    const { incorrect_answers: incAnswers,
      correct_answer: corAnswer } = questions[indice];
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
    this.setState({ shuffle });
  }

  verifiAnswer = (answer, index) => {
    if (answer === CORRECT_ANSWER) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  render() {
    const { questions } = this.props;
    const { indice, answered, isBtnDisabled, nextBtn, seconds, shuffle } = this.state;
    return (
      <>
        {
          questions.filter((obj, index) => index === indice).map((question) => (
            <div key={ question.question }>
              <h2 data-testid="question-category">{ question.category }</h2>
              <h3 data-testid="question-text">{ question.question }</h3>
              <div data-testid="answer-options">
                { shuffle.map((incAnswer, index) => (
                  <button
                    key={ incAnswer.answer }
                    className={ answered ? incAnswer.type : null }
                    type="button"
                    disabled={ isBtnDisabled }
                    onClick={ () => this
                      .getButtonColor(incAnswer.type, question.difficulty) }
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
              <h2>{`You have: ${seconds} seconds`}</h2>
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
  dispatchScore: (value) => dispatch(actionUpdateScore(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Question);
