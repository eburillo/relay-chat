import React from 'react';
import Relay from 'react-relay';
import ItemCounter from './ItemCounter';
import Entry from './Entry/Entry';
import InputText from './InputText';
import AddEntryMutation from '../mutations/AddEntryMutation';

class App extends React.Component {

  render() {
    let entries = this.props.viewer.entryConnection.edges;
    console.log(entries);
    return (
      <div className="app-container">
          <ItemCounter></ItemCounter>
          <ul className="entry-list">
            {entries.map(entry =>
              <Entry key={entry.node.id} entry={entry.node}></Entry>
            )}
          </ul>
          <InputText onSave={this._handleTextInputSave}></InputText>
      </div>
    );
  }

  _handleTextInputSave = (text) => {
    this.props.relay.commitUpdate(
      new AddEntryMutation({
        text,
        viewer: this.props.viewer
      })
    );
    console.log(text);
  };

}

export default Relay.createContainer(App, {
  initialVariables: {
    maxEntries: 50
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        entryConnection(last: $maxEntries) {
          edges {
            node {
              id,
              ${Entry.getFragment('entry')}
            }
          },
        },

      }
    `,
  },
});

// ${AddEntryMutation.getFragment('viewer')}, TODO: add to fragment
