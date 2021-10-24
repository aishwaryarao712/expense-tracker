import moment from 'moment';
import { useMutation } from '@apollo/client';
import Modal from 'react-modal';

import { DELETE_EXPENSE } from '../../graphql/mutations';
import { useState } from 'react';

type Props = {
  groupedExpenses: any[];
  day: string;
  refetch: VoidFunction;
};

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const GroupedExpenses: React.FC<Props> = ({
  groupedExpenses,
  day,
  refetch,
}) => {
  const [selectedExpense, setExpense] = useState(null);
  const createdAt = moment(day).format('MMMM Do, YYYY');
  const selectedExpenseData = groupedExpenses.find(
    (e) => e.id === selectedExpense
  );

  const [deleteExpense, { loading }] = useMutation(DELETE_EXPENSE, {
    onCompleted: () => {
      refetch();
      setExpense(null);
    },
  });

  const deleteTransaction = (id: number | null) => {
    const isOk = window.confirm('Are you sure you want to delete the expense?');

    if (isOk && id) {
      deleteExpense({
        variables: {
          id: id,
        },
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={!!selectedExpense}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          setExpense(null);
        }}
      >
        <div>
          <div style={{ padding: '10px', marginBottom: '10px' }}>
            {selectedExpenseData?.name} - ${selectedExpenseData?.amount}
          </div>
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <button
              style={{ width: '100%', cursor: 'pointer' }}
              disabled={loading}
              onClick={() => deleteTransaction(selectedExpense)}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
      <div
        style={{
          border: '1px solid black',
          borderRadius: '8px',
          marginBottom: '10px',
        }}
      >
        <div style={{ padding: '8px 10px 8px 15px' }} className="border-bottom">
          {createdAt}
        </div>
        {groupedExpenses.map((d, i) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 10px 8px 15px',
              cursor: 'pointer',
            }}
            className={i !== groupedExpenses.length - 1 ? 'border-bottom' : ''}
            onClick={() => setExpense(d.id)}
          >
            <div>{d.name}</div>
            <div>
              {d.type === 'debit' && '-'}
              {`$${d.amount}`}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
