import React from 'react';

export default function Bar({ value, color = 'black', border }) {
  return (
    <div
      style={{
        width: value + '%',
        height: '35px',
        backgroundColor: color,
        borderRadius: border,
      }}
    />
  );
}
