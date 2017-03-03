import React from 'react';
import Relay from 'react-relay';

class Avatar extends React.Component {
  render() {
    let imgSource = "./assets/" + this.props.viewer.avatar;
    return (
      <div className="avatar">
        <img src={imgSource} />
      </div>
    );
  }
}

export default Relay.createContainer(Avatar, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        avatar,
      },
    `,
  },
});
