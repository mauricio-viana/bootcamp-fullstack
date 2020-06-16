import React, { Component } from 'react';

export default class InputNumber extends Component {
  handleChange = (event) => {
    const newValue = event.target.value;
    this.props.onChangeSalary(newValue);
  };

  render() {
    const { value } = this.props;
    return (
      <div className="input-field col s12">
        <input
          type="number"
          min="0"
          max="9999999999"
          step="100"
          id="fullSalary"
          value={value}
          onChange={this.handleChange}
        />
        <label className="active" htmlFor="fullSalary">
          Salário Bruto
        </label>
      </div>
    );
  }
}
