import React, { Component } from 'react';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.props.handleInputChange(e.target.value);
  }
  render() {
    const { label, value } = this.props;
    return (
      <div>
        <label>{label}</label>
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={this.handleInputChange}
          />
      </div>
    );
  }
}
