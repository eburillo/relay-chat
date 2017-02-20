import React from 'react';
import Relay from 'react-relay';
import Avatar from './Avatar';
import Controls from './Controls';
import Timestamp from './Timestamp';
import RemoveEntryMutation from '../../mutations/RemoveEntryMutation';

class Entry extends React.Component {
  render() {
    let entry = this.props.entry;
    return (
      <div className="entry">
        <Avatar></Avatar>
        <div className="entry-content">
          <p className="entry-text">{entry.text}</p>
          <Controls onDelete={this._handleDeleteEntry}></Controls>
        </div>
        <Timestamp entry={entry}></Timestamp>
      </div>
    );
  }

  _handleDeleteEntry = () => {
    this.props.relay.commitUpdate(
      new RemoveEntryMutation({
        entry: this.props.entry,
        viewer: this.props.viewer
      })
    );
  };

}

export default Relay.createContainer(Entry, {
  fragments: {
    entry: () => Relay.QL`
      fragment on Entry {
        text,
        ${Timestamp.getFragment('entry')}
        ${RemoveEntryMutation.getFragment('entry')},
      },
    `,
  },
});
