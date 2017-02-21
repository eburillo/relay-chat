import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';

class ControlButton extends React.Component {
  render() {
    const icon = this.props.icon;
    const btnClass = classNames({
      'controls--button': true,
      'fa': true,
      [`fa-${icon}`]: icon
    });
    return (
      <button className={btnClass} onClick={this.props.clickHandler}></button>
    );
  }
}

export default ControlButton;
