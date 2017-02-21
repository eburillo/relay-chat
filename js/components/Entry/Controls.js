import React from 'react';
import Relay from 'react-relay';
import ControlButton from './ControlButton';

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <ControlButton className="controls--button" icon="pencil" clickHandler={null}></ControlButton>
        <ControlButton className="controls--button" icon="remove" clickHandler={this.props.onDelete}></ControlButton>
      </div>
    );
  }
}

export default Controls;
