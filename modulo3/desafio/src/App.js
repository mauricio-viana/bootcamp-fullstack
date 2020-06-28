import React, { useState, useEffect } from 'react';
import Installments from './components/Installments';
import { calculateInterest } from './helpers/calculateInterest';
import Inputs from './components/Inputs';

export default function App() {
  const [initalValue, setInitialValue] = useState(1000);
  const [monthlyInterest, setMonthlyInterest] = useState(1);
  const [monthlyPeriod, setMonthlyPeriod] = useState(12);
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    setInstallments(
      calculateInterest(initalValue, monthlyInterest, monthlyPeriod)
    );
  }, [initalValue, monthlyInterest, monthlyPeriod]);

  const handleChangeInitalValue = (newInitalValue) => {
    setInitialValue(newInitalValue);
  };

  const handleChangeMonthlyInterest = (newInterest) => {
    setMonthlyInterest(newInterest);
  };

  const handleChangeMonthlyPeriod = (newMonthlyPeriod) => {
    setMonthlyPeriod(newMonthlyPeriod);
  };

  return (
    <div className="container">
      <h1 className="center">React Juros Compostos</h1>
      <div className="center row">
        <Inputs
          id="1"
          min="100"
          max="9999999999"
          step="100"
          value={initalValue}
          onChangeChangeInput={handleChangeInitalValue}
          label="Montante inicial:"
        />

        <Inputs
          id="2"
          min="-12"
          max="12"
          step="0.1"
          value={monthlyInterest}
          onChangeChangeInput={handleChangeMonthlyInterest}
          label="Taxa de juros mensal:"
        />

        <Inputs
          id="3"
          min="1"
          max="36"
          step="1"
          value={monthlyPeriod}
          onChangeChangeInput={handleChangeMonthlyPeriod}
          label="Quantidade de períodos:"
        />
      </div>

      <Installments data={installments} />
    </div>
  );
}
