import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

export default class PierChart extends Component {
  render() {
    const { bar1, bar2, bar3 } = this.props;
    return (
      <div>
        <Chart
          width={'100%'}
          height={'400px'}
          chartType="PieChart"
          data={[
            ['Title', 'Porcentage'],
            ['Salário Líquido', bar3],
            ['Desconto INSS', bar1],
            ['Desconto IRPF', bar2],
          ]}
          options={{
            pieSliceText: 'label',
            pieStartAngle: 100,
            is3D: true,
            colors: ['#16a085', '#e67e22', '#c0392b'],
          }}
        />
      </div>
    );
  }
}
