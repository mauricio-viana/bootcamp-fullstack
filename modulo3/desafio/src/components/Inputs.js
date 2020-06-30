import React from 'react';

export default function Inputs(props) {
  const { id, label, value, onChangeChangeInput, min, max, step } = props;

  const handleChangeInput = (event) => {
    onChangeChangeInput(Number(event.target.value));
  };

  return (
    <div className="col input-field s12 m6 l4">
      <input
        id={id}
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChangeInput}
      />
      <label htmlFor={id} className="active">
        {label}
      </label>
    </div>
  );
}
