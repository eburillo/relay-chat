import React from 'react';
import Relay from 'react-relay';

class Button extends React.Component {
  render() {
    return (
      <button className="controls--button">{this.props.type.slice(0,1).toUpperCase()}</button>
    );
  }
}

export default Button;
