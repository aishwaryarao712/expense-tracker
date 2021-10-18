import { getTotalAmount } from '../../helpers';

type SummaryProps = {
  expenses: any;
};

export const Summary: React.FC<SummaryProps> = ({ expenses }) => {
  const totalExpenses = getTotalAmount(expenses, 'debit');
  const totalIncome = getTotalAmount(expenses, 'credit');
  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary-container">
      <div className="border-right summary-block">
        <div style={{ paddingBottom: '10px' }}>Expenses</div>
        <div>${totalExpenses}</div>
      </div>
      <div className="border-right summary-block">
        <div style={{ paddingBottom: '10px' }}>Income</div>
        <div>${totalIncome}</div>
      </div>
      <div className="summary-block">
        <div style={{ paddingBottom: '10px' }}>Balance</div>
        <div>${balance}</div>
      </div>
    </div>
  );
};
