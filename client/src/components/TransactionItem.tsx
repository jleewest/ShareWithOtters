import '../css/TransactionItem.css';
import { Transaction } from '../index';

type TransactionItemProps = {
  id: number;
  type: string;
  transactor: string;
  date: string;
  description: string;
  amount: number;
  onAccept: (id: number) => void; // Function to handle accepting a transaction
  onAddNote: (id: number) => void; // Function to handle adding a note
};

const TransactionItem = ({
  id,
  type,
  transactor,
  date,
  description,
  amount,
  onAccept,
  onAddNote,
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
      <td>{transactor}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td style={{ color: amountColor, fontWeight: 'bold' }}>
        {sign}${amount.toFixed(2)}
      </td>
    </tr>
  );
};
export default TransactionItem;
