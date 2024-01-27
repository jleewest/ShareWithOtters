import TransactionItem from "./TransactionItem";
import '../css/TransactionTable.css'

export type Transaction = {
  id: number;
  date: string;
  creator: string;
  description: string;
  amount: number;
  status: 'approved' | 'disputed' | 'pending';
  type: 'expense' | 'income';
  notes?: string;
};

type TransactionTableProps = {
  transactions: Transaction[];
};

const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Status</th>
          <th>Creator</th>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <TransactionItem
          id={transaction.id}
          status={transaction.status}
          type={transaction.type}
          creator={transaction.creator}
          date={transaction.date}
          description={transaction.description}
          amount={transaction.amount}
          onAccept={() => {/* function to handle accept */}}
          onAddNote={() => {/* function to handle add note */}}
        />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
