import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { image, name, score } = this.props;
    return (
      <div>
        <img src={ image } alt={ name } data-testid="header-profile-picture" />
        <h4 data-testid="header-player-name">{ name }</h4>
        <h4 data-testid="header-score">{ score }</h4>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  image: state.player,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
