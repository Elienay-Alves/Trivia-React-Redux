import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { login, getToken } from '../redux/action/index';
import fetchTriviaApi from '../services/fetchTriviaApi';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      gravatarEmail: '',
      btnDisable: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const MIN_LENGTH_VALUE = 1;
    const { gravatarEmail, name } = this.state;
    const nameIsValid = name;
    const minPassValid = gravatarEmail.length && nameIsValid.length >= MIN_LENGTH_VALUE;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = regexEmail.test(gravatarEmail);

    const isValid = minPassValid && isEmailValid;
    if (isValid) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  handleBtnConfig = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/Config');
  }

  handleClick = async (name, gravatarEmail) => {
    const { submitFormAction, history, TOKEN } = this.props;
    submitFormAction({
      name,
      gravatarEmail,
    });

    const receiver = await fetchTriviaApi();
    TOKEN(receiver);
    history.push('/jogo');
  };

  render() {
    const { gravatarEmail, name, btnDisable } = this.state;
    return (
      <main className="formStyle">
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleBtnConfig }
        >
          Configurações
        </button>
        <form>
          <h1>Login</h1>
          <label htmlFor="input-email">
            <input
              data-testid="input-gravatar-email"
              type="email"
              id="input-email"
              name="gravatarEmail"
              value={ gravatarEmail }
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="input-player-name">
            <input
              data-testid="input-player-name"
              type="text"
              id="input-player-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <br />
        </form>
        <button
          type="submit"
          data-testid="btn-play"
          onClick={ () => this.handleClick(name, gravatarEmail) }
          disabled={ btnDisable }
        >
          Entrar
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitFormAction: (payload) => dispatch(login(payload)),
  TOKEN: (value) => dispatch(getToken(value)),
});

Login.propTypes = {
  submitFormAction: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  TOKEN: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

// pairPrograming entre integrantes do grupo;
