import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchQuestion } from '../redux/action';

class Question extends React.Component {
  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  allAnswers = (incAnswers, corAnswer) => {
    const allAnswers = [...incAnswers];
    allAnswers.push(corAnswer);
    return (allAnswers.sort());
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
                  <div>
                    <h2 data-testid="question-category">{ question.category }</h2>
                  </div>
                  <div>
                    <h3 data-testid="question-text">{ question.question }</h3>
                  </div>
                </div>
              </div>
              {
                this.allAnswers(question.incorrect_answers, question.correct_answer)
                  .map((incAnswer, index) => (
                    <div
                      data-testid="answer-options"
                      key={ incAnswer }
                    >
                      <button
                        type="button"
                        data-testid={
                          this.verifiAnswer(incAnswer, question.correct_answer, index)
                        }
                      >
                        { incAnswer }
                      </button>
                    </div>
                  ))
              }
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
