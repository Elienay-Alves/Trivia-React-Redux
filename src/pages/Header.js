import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import fetchGravatar from '../services/fetchGravatar';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
    };
  }

  async componentDidMount() {
    const { email } = this.props;
    const gravatarEmail = md5(email).toString();
    await fetchGravatar(gravatarEmail).then((data) => this.setState({ image: data.url }));
  }

  render() {
    const { email, name, score } = this.props;
    const { image } = this.state;
    console.log(image);
    return (
      <div>
        <img src={ image } alt={ email } data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">{ score }</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.loginReducer.gravatarEmail,
  name: state.loginReducer.name,
  score: state.loginReducer.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
