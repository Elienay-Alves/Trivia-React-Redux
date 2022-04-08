import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const get = JSON.parse(localStorage.getItem('ranking'));
    const item = !get ? [] : get;
    this.setState({
      data: item,
    });
  }

  render() {
    const { data } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClik={ () => history.push('login') }
        >
          Início
        </button>
        <ul>
          { data.map((el, index) => (
            <>
              <li>
                <img scr={ el.img } alt={ el.name } />
              </li>
              <li
                key={ index }
                data-testid={ `player-name-${index}` }
              >
                { el.name }
              </li>
              <li
                data-testid={ `player-score-${index}` }
              >
                { el.score }
              </li>
            </>
          )) }
        </ul>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
