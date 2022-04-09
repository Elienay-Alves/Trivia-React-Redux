import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          { Number(assertions) <= 2 ? 'Could be better...' : 'Well Done!'}
        </h1>
        <h2 data-testid="feedback-total-score">{ Number(score) }</h2>
        <h2 data-testid="feedback-total-question">{ Number(assertions) }</h2>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.loginReducer.assertions,
  score: state.loginReducer.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  score: PropTypes.number.isRequired,
};
