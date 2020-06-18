import React from 'react';
import TableContribution from '../table/TableContribution';

export default function DivSection() {
  return (
    <div className="section">
      <h5>Informações</h5>
      <p>
        Este cálculo é feito progressivamente. Dentro de cada faixa salarial o
        trabalhador contribui com a respectiva alíquota até atingir o valor do
        salário nominal. Para quem recebe acima de R$ 6.101,06 contribui com o
        máximo da previdência, equivalente a R$ 713,10.
      </p>

      <TableContribution />

      <p style={{ marginTop: '40px' }}>
        Referência:{' '}
        <a
          target="_blank"
          href="https://www.todacarreira.com/calculo-salario-liquido/"
        >
          Como calcular o salário líquido passo a passo
        </a>
      </p>
    </div>
  );
}
