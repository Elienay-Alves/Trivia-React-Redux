import React from 'react';

export default class Answers extends React.Component {
  render() {
    return (
      <div data-testid="answer-options">
        <button
          type="button"
          data-testid="wrong-answer-"
          // { ...index }
        >
          Resposta 1
        </button>

        <button
          type="button"
          data-testid="wrong-answer-"
          // { ...index }
        >
          Resposta 2
        </button>

        <button
          type="button"
          data-testid="correct-answer"
        >
          Resposta 3
        </button>

        <button
          type="button"
          data-testid="wrong-answer-"
          // { ...index }
        >
          Resposta 4
        </button>
      </div>
    );
  }
}
