import React from 'react';
import {
  formatMoneyPositiveNegative,
  formatMoney,
  formatPercent,
} from '../helpers/formatNumber';
import css from './installment.module.css';

export default function Installment({ data }) {
  const { id, value, difference, percentage, profit } = data;

  const colorValue = profit ? 'green-text darken-3' : 'red-text darken-3';
  const colorPercent = profit ? 'blue-text darken-3' : 'orange-text darken-3';
  const colorInstallment = profit ? 'green darken-3' : 'red darken-3';

  return (
    <div className="col s12 m3 l2 ">
      <div className={css.flexCard}>
        <span className={colorInstallment}>
          <strong>{id}</strong>
        </span>

        <div className={css.dataDiv}>
          <div className={colorValue}>
            <strong>{formatMoney(value)}</strong>
          </div>

          <div className={colorValue}>
            <strong>{formatMoneyPositiveNegative(difference)}</strong>
          </div>

          <div className={colorPercent}>
            <strong>{formatPercent(percentage)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
