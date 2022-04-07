import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import fetchQuestions from '../services/fetchQuestionsApi';
import Question from '../components/Question';
import Answers from '../components/Answers';

class Jogo extends React.Component {
  // componentDidMount() {
  //   const { TOKEN } = this.props;
  //   fetchQuestions(TOKEN);
  // }

  render() {
    return (
      <>
        <h1>Jogo</h1>
        <Question />
        <Answers />
      </>
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
