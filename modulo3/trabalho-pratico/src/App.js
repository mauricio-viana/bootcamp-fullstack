import React, { Component } from 'react';
import { calculateSalaryFrom } from './helpers/salary';
import InputFullSalary from './components/inputs/InputFullSalary';
import InputReadOnly from './components/inputs/InputReadOnly';
import Bar from './components/bar/Bar';
import css from './components/bar/bar.module.css';
import { formatMoney, formatPercentage } from './helpers/_formatHelpers';
import PierChart from './components/piechart/PierChart';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
      results: {},
    };
  }

  componentDidMount() {
    const { fullSalary } = this.state;
    this.setState({
      results: calculateSalaryFrom(fullSalary),
    });
  }

  handleChangeSalary = (fullSalary) => {
    this.setState({
      fullSalary,
      results: calculateSalaryFrom(fullSalary),
    });
  };

  readResults = (value, porcentage) => {
    return porcentage >= 0.01
      ? `${formatMoney(value)} (${formatPercentage(porcentage)})`
      : formatMoney(value);
  };

  render() {
    const {
      fullSalary,
      results: { baseINSS, discountINSS, baseIRPF, discountIRPF, netSalary },
    } = this.state;

    const bar1 = (discountINSS / baseINSS) * 100;
    const bar2 = (discountIRPF / baseINSS) * 100;
    const bar3 = 100 - (bar1 + bar2);

    return (
      <div className="container">
        <h1 className="center-align">React Salary</h1>

        <div className="row">
          <div className="col s5 push-7">
            <InputFullSalary
              value={fullSalary}
              onChangeSalary={this.handleChangeSalary}
            />

            <InputReadOnly
              id="1"
              value={formatMoney(baseINSS)}
              label="Base INSS"
            />
            <InputReadOnly
              id="2"
              value={this.readResults(discountINSS, bar1)}
              label="Desconto INSS"
              color="#e67e22"
            />
            <InputReadOnly
              id="3"
              value={formatMoney(baseIRPF)}
              label="Base IRPF"
            />
            <InputReadOnly
              id="4"
              value={this.readResults(discountIRPF, bar2)}
              label="Desconto INSS"
              color="#c0392b"
            />
            <InputReadOnly
              id="5"
              value={this.readResults(netSalary, bar3)}
              label="Salário Líquido"
              color="#16a085"
            />
          </div>
          <div className="col s6">
            <PierChart bar1={bar1} bar2={bar2} bar3={bar3} />
          </div>
        </div>

        <div className={css.bar}>
          <Bar value={bar1} color="#e67e22" border="8px 0px 0px 8px" />
          <Bar value={bar2} color="#c0392b" />
          <Bar value={bar3} color="#16a085" border="0 8px 8px 0" />
        </div>
      </div>
    );
  }
}
