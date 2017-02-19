import React from 'react';
import Relay from 'react-relay';
import Button from './Button';

class Controls extends React.Component {
  render() {
    return (
      <div className="controls">
        <Button type="edit"></Button>
        <Button type="remove"></Button>
      </div>
    );
  }
}

export default Controls;
