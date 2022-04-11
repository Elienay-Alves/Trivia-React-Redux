import React, { Component } from 'react';

const second = 1000;
const zeroSeconds = 0;

class Cronometer extends Component {
  constructor() {
    super();
    this.state = { seconds: 30 };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, second);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.seconds === zeroSeconds) {
      this.setState({
        seconds: 30,
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { seconds } = this.state;

    return (
      <h2>
        {`You have: ${seconds} seconds`}
      </h2>
    );
  }
}

export default Cronometer;
