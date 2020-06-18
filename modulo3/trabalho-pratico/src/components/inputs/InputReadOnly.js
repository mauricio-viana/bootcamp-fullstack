import React from 'react';

export default function InputRead({ value, label, id, color }) {
  return (
    <div className="input-field col s6">
      <input
        type="text"
        id={id}
        value={value}
        readOnly
        style={{
          fontWeight: 'bold',
          color: color,
        }}
      />
      <label className="active" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
