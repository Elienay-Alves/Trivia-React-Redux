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
    // const random = Math.floor(Math.random() * allAnswers.length);
    // console.log(random, allAnswers[random]);
    const numberRandom = 0.5;
    const quests = [...incAnswers, corAnswer];
    const shuffle = quests.sort(() => Math.random() - numberRandom);
    // const shuffle = Math.floor(Math.random() * quests.length);
    console.log(quests);
    console.log(shuffle);
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
                        type="button"
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
