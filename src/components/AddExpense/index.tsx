import { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';

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
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
const defaultOption = options[0];

export const AddExpense = () => {
  const [isModalOpen, toggleModal] = useState(false);

  function myFormat(num: number | null) {
    return '$' + num;
  }

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
      <Modal isOpen={isModalOpen} style={customStyles}>
        <div>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            Add Transaction
          </div>
          <div style={{ marginBottom: '15px' }}>
            <Select
              options={options}
              value={defaultOption}
              placeholder="Transaction Type"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input
              className="transaction-description"
              placeholder="Transaction Description"
            />
          </div>
          <div
            style={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <NumericInput className="form-control" format={myFormat} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <button style={{ width: '30%', padding: '5px' }}>Add</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
