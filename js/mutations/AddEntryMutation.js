import Relay from 'react-relay';

export default class AddEntryMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation{ addEntry }`;
  }

  getVariables() {
    return {
      text: this.props.text,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddEntryPayload {
        entryEdge,
        viewer {
          entryConnection,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'entryConnection',
      edgeName: 'entryEdge',
      rangeBehaviors: {
        '': 'append',
      }
    }];
  }

}
