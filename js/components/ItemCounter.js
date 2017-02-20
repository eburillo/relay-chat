import React from 'react';
import Relay from 'react-relay';

class ItemCounter extends React.Component {
  render() {
    let totalCount = this.props.viewer.totalCount;
    return (
      <div className="item-counter">
        <span className="item-counter--sentence">{totalCount} items</span>
      </div>
    );
  }
}

export default Relay.createContainer(ItemCounter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      },
    `,
  },
});
