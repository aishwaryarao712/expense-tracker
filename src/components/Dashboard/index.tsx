import { useQuery } from '@apollo/client';
import { FETCH_EXPENSES } from '../../graphql/queries';
import { Expenses } from '../Expenses';
import { AddExpense } from '../AddExpense';

import '../../styles/global.css';
import { Summary } from '../Summary';

const Dashboard = () => {
  const {
    data: expenseData,
    loading: fetchingExpenses,
    error: userError,
    refetch,
  } = useQuery(FETCH_EXPENSES);

  if (fetchingExpenses) {
    return <div>Fetching expenses...</div>;
  }

  if (userError) {
    return <div>Error fetching expenses...</div>;
  }

  return (
    <div className="Dashboard">
      <Summary expenses={expenseData.expenses} />
      <Expenses expenses={expenseData.expenses} />
      <AddExpense refetch={refetch} />
    </div>
  );
};

export default Dashboard;
