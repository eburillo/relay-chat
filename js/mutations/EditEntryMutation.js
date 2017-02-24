import Relay from 'react-relay';

export default class EditEntryMutation extends Relay.Mutation {

  static fragments = {
    entry: () => Relay.QL`
      fragment on Entry {
        id,
      }
    `,
  };

  getMutation() {
    console.log("get mut");
    return Relay.QL`mutation{ editEntry }`;
  }

  getVariables() {
    console.log("get var");
    return {
      id: this.props.entry.id,
      text: this.props.text,
    };
  }

  getFatQuery() {
    console.log("hoi");
    return Relay.QL`
      fragment on EditEntryPayload @relay(pattern: true){
        entry {
          text,
          date,
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        entry: this.props.entry.id
      }
    }];
  }

}
