import React, { Component } from 'react';
import css from './table.module.css';
import TableRow from './TableRow';

export default class TableContribution extends Component {
  render() {
    return (
      <div className="container">
        <table className="z-depth-2">
          <thead>
            <tr className={css.cellsHead}>
              <th className={css.cells}>Salário de contribuição</th>
              <th className={css.cells}>Alíquota</th>
            </tr>
          </thead>

          <tbody>
            <TableRow
              description="Salário mínimo: R$ 1.045,00"
              porcentage="7,5%"
            />
            <TableRow
              description="De R$ 1.045,01 a R$ 2.089,60"
              porcentage="9%"
            />
            <TableRow
              description="De R$ 2.089,61 a R$ 3.134,40"
              porcentage="12%"
            />

            <TableRow
              description="De R$ 3.134,41 a R$ 6.101,06"
              porcentage="14%"
            />
          </tbody>
          {/* <TableHead />
          <TableBody /> */}
        </table>
      </div>
    );
  }
}
