export const getTotalAmount = (
  expenses: { type: string; amount: number }[],
  type: 'credit' | 'debit'
) => {
  let sum = 0;
  expenses.forEach((e) => {
    if (e.type === 'debit' && type === 'debit') {
      sum += e.amount;
    } else if (e.type === 'credit' && type === 'credit') {
      sum += e.amount;
    }
  });
  return sum;
};
