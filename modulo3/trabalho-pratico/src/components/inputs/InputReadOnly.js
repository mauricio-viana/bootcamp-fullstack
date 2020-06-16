import React, { Component } from 'react';

export default class InputRead extends Component {
  render() {
    const { value, label, id, color } = this.props;
    return (
      <div className="input-field col s12 m6 l3">
        <input
          type="text"
          id={id}
          value={value}
          readOnly
          style={{
            fontWeight: 'bold',
            color: color,
          }}
        />
        <label className="active" htmlFor={id}>
          {label}
        </label>
      </div>
    );
  }
}
