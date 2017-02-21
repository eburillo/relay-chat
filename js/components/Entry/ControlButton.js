import React from 'react';
import Relay from 'react-relay';

class ControlButton extends React.Component {
  render() {
    let btnClass = "controls--button fa fa-" + this.props.icon;
    return (
      <button className={btnClass} onClick={this.props.clickHandler}></button>
    );
  }
}

export default ControlButton;
