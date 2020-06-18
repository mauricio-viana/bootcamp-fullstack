import React from 'react';
import css from './table.module.css';

export default function TableRow({ description, porcentage }) {
  return (
    <tr>
      <td className={css.cells}>{description}</td>
      <td className={css.cells}>{porcentage}</td>
    </tr>
  );
}
