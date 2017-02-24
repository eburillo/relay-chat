import React from 'react';
import Relay from 'react-relay';
import classNames from 'classnames';

const ENTER_KEY = 13;

class InputText extends React.Component {

  state = {
    text: this.props.initialValue || ""
  }

  render() {
    const inputClass = classNames({
        'input-text': true,
        [`${this.props.type}`]: this.props.type
      });
    return (
      <input
        className={inputClass}
        type="text"
        placeholder={this.props.placeholder}
        onKeyDown={this._handleKeyDown}
        onChange={this._handleChange}
        onBlur={this._handleBlur}
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

  _handleBlur = () => {
    if (this.props.type === "edit") {
      this._submit();
    }
  }

  _submit = () => {
    if (this.state.text !== '') {
      this.props.onSave(this.state.text);
      this.setState({text: ''});
    }
  };

}

export default InputText;
