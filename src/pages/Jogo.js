import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Jogo extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1>Jogo</h1>
        <Header />
        <button
          type="button"
          onClick={ () => history.push('/feedback') }
        >
          Feedback
        </button>
      </div>
    );
  }
}

export default Jogo;

Jogo.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
