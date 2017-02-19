import React from 'react';
import Relay from 'react-relay';

class Avatar extends React.Component {
  render() {
    let imgSource = './assets/ballmer.png';
    return (
      <div className="avatar">
        <img src={imgSource} />
      </div>
    );
  }
}

export default Avatar;
