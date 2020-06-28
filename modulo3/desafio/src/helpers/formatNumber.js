const moneyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatMoneyPositiveNegative(value) {
  const money = moneyFormatter.format(value);

  if (value >= 0) {
    return `+${money}`;
  }

  return money;
}

function formatMoney(value) {
  return moneyFormatter.format(value);
}

function formatPercent(value) {
  return value.toFixed(2).replace('.', ',') + '%';
}

export { formatMoneyPositiveNegative, formatMoney, formatPercent };
