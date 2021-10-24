import { useState } from 'react';
import Modal from 'react-modal';
import Select, { SingleValue } from 'react-select';
import NumericInput from 'react-numeric-input';
import { useMutation } from '@apollo/client';

import { ADD_EXPENSE } from '../../graphql/mutations';

type Props = {
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

const options = [
  { value: 'debit', label: 'Expense' },
  { value: 'credit', label: 'Income' },
];
const defaultOption = options[0];

export const AddExpense: React.FC<Props> = ({ refetch }) => {
  const [isModalOpen, toggleModal] = useState(false);
  const [transactionType, setType] = useState<
    SingleValue<{
      value: string;
      label: string;
    }>
  >(defaultOption);
  const [amount, setAmount] = useState<number | null>(null);
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setAmount(null);
    setDescription('');
    setType(defaultOption);
  };

  const [addExpense, { loading }] = useMutation(ADD_EXPENSE, {
    variables: {
      name: description,
      amount: amount,
      type: transactionType?.value,
    },
    onCompleted: () => {
      toggleModal(false);
      refetch();
      resetForm();
    },
  });

  return (
    <div
      style={{
        justifyContent: 'flex-end',
        display: 'flex',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          borderRadius: '50%',
          border: '1px solid black',
          width: ' 40px',
          height: '40px',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '30px',
        }}
        onClick={() => toggleModal(true)}
      >
        +
      </div>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          toggleModal(false);
          resetForm();
        }}
      >
        <div>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            Add Transaction
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Select
              options={options}
              value={transactionType}
              placeholder="Transaction Type"
              maxMenuHeight={105}
              onChange={(e) => setType(e)}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input
              className="transaction-description"
              placeholder="Transaction Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div
            style={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ marginRight: '4px' }}>$</div>
            <NumericInput
              className="form-control"
              onChange={(e) => setAmount(e)}
              value={amount?.toString()}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button
              style={{ width: '30%', padding: '5px' }}
              onClick={() => addExpense()}
              disabled={loading}
            >
              Add
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
