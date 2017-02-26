import Relay from 'react-relay';

export default class RemoveEntryMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on User {
        id,
        totalCount,
      }
    `,
    entry: () => Relay.QL`
      fragment on Entry {
        id,
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{ removeEntry }`;
  }

  getVariables() {
    return {
      id: this.props.entry.id,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveEntryPayload @relay(pattern: true){
        deletedEntryId,
        viewer {
          id,
          totalCount
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'entries',
      deletedIDFieldName: 'deletedEntryId',
    }];
  }

}
