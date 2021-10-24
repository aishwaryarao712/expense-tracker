import { GroupedExpenses } from './GroupedExpenses';

type ExpensesProps = {
  expenses: any[];
  refetch: VoidFunction;
};

export const Expenses: React.FC<ExpensesProps> = ({ expenses, refetch }) => {
  const groupedExpenses = expenses.reduce(function (r, a) {
    r[a.created_at] = r[a.created_at] || [];
    r[a.created_at].push(a);
    return r;
  }, Object.create(null));

  return (
    <div>
      {Object.keys(groupedExpenses).map((day) => {
        return (
          <GroupedExpenses
            groupedExpenses={groupedExpenses[day]}
            day={day}
            refetch={refetch}
          />
        );
      })}
    </div>
  );
};
