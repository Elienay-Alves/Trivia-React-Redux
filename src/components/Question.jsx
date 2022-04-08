import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchQuestion } from '../redux/action';
import './buttonColor.css';

class Question extends React.Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  getButtonColor = ({ target }, incAnswer, quest, index) => {
    const verifyAnswer = this.verifiAnswer(incAnswer, quest, index);
    if (verifyAnswer === 'correct-answer') {
      target.className = verifyAnswer;
    } else {
      target.className = 'wrong-answer';
    }
  }

  allAnswers = (incAnswers, corAnswer) => {
    const numberRandom = 0.5;
    const quests = [...incAnswers, corAnswer];
    const shuffle = quests.sort(() => Math.random() - numberRandom);
    return (shuffle);
  }

  verifiAnswer = (answer, corAnswer, index) => {
    if (answer === corAnswer) {
      return 'correct-answer';
    }
    return `wrong-answer-${index}`;
  }

  render() {
    const { questions } = this.props;
    return (
      <>
        {
          questions.map((question) => (
            <div key={ question.question }>
              <div>
                <div>
                  <div data-testid="question-category">
                    <h2>{ question.category }</h2>
                  </div>
                  <div data-testid="question-text">
                    <h3>{ question.question }</h3>
                  </div>
                </div>
              </div>
              <div
                data-testid="answer-options"
              >
                {
                  this.allAnswers(question.incorrect_answers, question.correct_answer)
                    .map((incAnswer, index) => (
                      <button
                        key={ incAnswer }
                        className=""
                        type="button"
                        onClick={ (event) => (this.getButtonColor(event, incAnswer,
                          question.correct_answer, index)) }
                        data-testid={
                          this.verifiAnswer(incAnswer, question.correct_answer, index)
                        }
                      >
                        { incAnswer }
                      </button>
                    ))
                }
              </div>
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
