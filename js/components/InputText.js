import React from 'react';
import Relay from 'react-relay';

const ENTER_KEY = 13;

class InputText extends React.Component {

  state = {
    text: ""
  }

  render() {
    return (
      <input
        className="input-text"
        type="text"
        placeholder="What are you thinking?"
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        value={this.state.text}
      />
    );
  }

  _handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      this._submit();
    }
  };

  _handleChange = (e) => {
    this.setState({text: e.target.value})
  }

  _submit = () => {
    if (this.state.text !== '') {
      this.props.onSave(this.state.text);
      this.setState({text: ''});
    }
  };

}

export default InputText;
