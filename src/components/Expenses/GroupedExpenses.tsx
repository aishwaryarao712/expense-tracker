import moment from 'moment';

type Props = {
  groupedExpenses: any[];
  day: string;
};

export const GroupedExpenses: React.FC<Props> = ({ groupedExpenses, day }) => {
  const createdAt = moment(day).format('MMMM Do, YYYY');
  return (
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
          }}
          className={i !== groupedExpenses.length - 1 ? 'border-bottom' : ''}
        >
          <div>{d.name}</div>
          <div>
            {d.type === 'debit' && '-'}
            {`$${d.amount}`}
          </div>
        </div>
      ))}
    </div>
  );
};
