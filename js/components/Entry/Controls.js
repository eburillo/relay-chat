import React from 'react';
import Relay from 'react-relay';

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <button
          className="controls--button">
          E
        </button>
          <button
            className="controls--button"
            onClick={this.props.onDelete}>
            R
          </button>
      </div>
    );
  }
}

export default Controls;
