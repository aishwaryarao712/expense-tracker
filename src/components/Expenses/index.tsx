import { GroupedExpenses } from './GroupedExpenses';

type ExpensesProps = {
  expenses: any[];
};

export const Expenses: React.FC<ExpensesProps> = ({ expenses }) => {
  const groupedExpenses = expenses.reduce(function (r, a) {
    r[a.created_at] = r[a.created_at] || [];
    r[a.created_at].push(a);
    return r;
  }, Object.create(null));

  return (
    <div>
      {Object.keys(groupedExpenses).map((day) => {
        return (
          <GroupedExpenses groupedExpenses={groupedExpenses[day]} day={day} />
        );
      })}
    </div>
  );
};
