import React from 'react';
import Installment from './Installment';

export default function Installments({ data }) {
  return (
    <div className="row">
      {data.map((item) => {
        const { id } = item;
        return <Installment key={id} data={item} />;
      })}
    </div>
  );
}
