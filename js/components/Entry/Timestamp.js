import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';

class Timestamp extends React.Component {
  render() {
    return (
      <div className="timestamp">{moment(this.props.entry.date).fromNow()}</div>
    );
  }
}

export default Relay.createContainer(Timestamp, {
  fragments: {
    entry: () => Relay.QL`
      fragment on Entry {
        date,
      },
    `,
  },
});
