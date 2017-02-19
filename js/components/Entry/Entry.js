import React from 'react';
import Relay from 'react-relay';
import Avatar from './Avatar';
import Controls from './Controls';
import Timestamp from './Timestamp';

class Entry extends React.Component {
  constructor() {
    super();
  }

  render() {
    let {entry} = this.props;
    return (
      <div className="entry">
        <Avatar></Avatar>
        <div className="entry-content">
          <p className="entry-text">{entry.text}</p>
          <Controls></Controls>
        </div>
        <Timestamp></Timestamp>
      </div>
    );
  }
}

export default Relay.createContainer(Entry, {
  fragments: {
    entry: () => Relay.QL`
      fragment on Entry {
        text,
      },
    `,
  },
});
