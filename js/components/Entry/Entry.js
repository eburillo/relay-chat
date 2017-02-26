import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';
import Avatar from './Avatar';
import Controls from './Controls';
import Timestamp from './Timestamp';
import InputText from '../InputText';
import RemoveEntryMutation from '../../mutations/RemoveEntryMutation';
import EditEntryMutation from '../../mutations/EditEntryMutation';

class Entry extends React.Component {

  state = {
    isEditing: false
  }

  render() {
    let entry = this.props.entry;
    const textFieldClasses = classNames({
      "entry-text": true,
      "hide": this.state.isEditing
    })
    return (
      <div className="entry">
        <Avatar></Avatar>
        <div className="entry-content">
          <p className={textFieldClasses}>{entry.text}</p>
          {this.state.isEditing && this._renderTextInput()}
          <Controls
            onDelete={this._handleDeleteEntry}
            onEdit={this._handleEditEntry}
            ></Controls>
        </div>
        <Timestamp entry={entry}></Timestamp>
      </div>
    );
  }

  _renderTextInput = () => {
    return (
      <InputText
        type="edit"
        initialValue={this.props.entry.text}
        onSave={this._handleTextInputSave}
        />
    );
  }

  _handleEditEntry = () => {
    this.setState({isEditing: true});
  };

  _handleDeleteEntry = () => {
    this.setState({isEditing: false});
    this.props.relay.commitUpdate(
      new RemoveEntryMutation({
        entry: this.props.entry,
        viewer: this.props.viewer
      })
    );
  };

  _handleTextInputSave = (text) => {
    this.setState({isEditing: false});
    this.props.relay.commitUpdate(
      new EditEntryMutation({
        text,
        entry: this.props.entry
      }),
    );
  };

}

export default Relay.createContainer(Entry, {
  fragments: {
    entry: () => Relay.QL`
      fragment on Entry {
        text,
        ${Timestamp.getFragment('entry')}
        ${EditEntryMutation.getFragment('entry')},
        ${RemoveEntryMutation.getFragment('entry')},
      },
    `,
    viewer:() => Relay.QL`
      fragment on User {
        ${RemoveEntryMutation.getFragment('viewer')},
      }
    `
  },
});
