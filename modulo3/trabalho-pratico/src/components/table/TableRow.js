import React, { Component } from 'react';
import css from './table.module.css';

export default class TableRow extends Component {
  render() {
    const { description, porcentage } = this.props;
    return (
      <tr>
        <td className={css.cells}>{description}</td>
        <td className={css.cells}>{porcentage}</td>
      </tr>
    );
  }
}
