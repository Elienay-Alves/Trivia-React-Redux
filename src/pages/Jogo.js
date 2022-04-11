import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import Header from '../components/Header';

class Jogo extends React.Component {
  render() {
    return (
      <div>
        <h1>Jogo</h1>
        <Header />
        <Question />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  TOKEN: state.token,
});

Jogo.propTypes = ({
  TOKEN: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Jogo);
