import '../css/TransactionItem.css'

type TransactionItemProps = {
  id: number;
  status: 'approved' | 'pending'| 'disputed';
  type: 'expense' | 'income';
  creator: string;
  date: string;
  description: string;
  amount: number;
  onAccept: (id: number) => void; // Function to handle accepting a transaction
  onAddNote: (id: number) => void; // Function to handle adding a note
};

const TransactionItem = ({
  id,
  status,
  type,
  creator,
  date,
  description,
  amount,
  onAccept,
  onAddNote
}: TransactionItemProps) => {
  const sign = type === 'expense' ? '-' : '+';
  const amountColor = type === 'income' ? 'green' : 'purple';

  return (
    <tr className='table-row'>
      {status === 'pending' && (
        <td>
          <button onClick={() => onAccept(id)}>Accept</button>
        </td>
      )}
      <td>
        <button onClick={() => onAddNote(id)}>Add Note</button>
      </td>
      <td>{creator}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td style={{ color: amountColor, fontWeight: 'bold' }}>
        {sign}${amount.toFixed(2)}
      </td>
    </tr>
  );
};
export default TransactionItem;
