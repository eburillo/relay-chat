import React from 'react';
import Relay from 'react-relay';

class Timestamp extends React.Component {
  render() {
    return (
      <div className="timestamp">{Date.now()}</div>
    );
  }
}

export default Timestamp;
