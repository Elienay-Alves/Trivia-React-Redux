import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/action/index';

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

  render() {
    const { gravatarEmail, name, btnDisable } = this.state;
    const { submitFormAction } = this.props;
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
        <Link to="/jogo">
          <button
            type="submit"
            data-testid="btn-play"
            onClick={ () => submitFormAction({
              name,
              gravatarEmail,
            }) }
            disabled={ btnDisable }
          >
            Entrar
          </button>
        </Link>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitFormAction: (payload) => dispatch(login(payload)),
});

Login.propTypes = {
  submitFormAction: PropTypes.func.isRequired,
  history: PropTypes.shape(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
