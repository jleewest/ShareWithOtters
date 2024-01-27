import React, { useState } from 'react';

type TransactionItemProps = {
  initialStatus: 'approved' | 'pending';
  status: 'approved' | 'pending';
  type: 'expense' | 'income';
  creator: string;
  date: string;
  description: string;
  amount: number;
};

const TransactionItem = ({ initialStatus, type, creator, date, description, amount }: TransactionItemProps) => {
  const sign = type === 'expense' ? '-' : '+';
  // const statusColor = status === 'approved' ? 'green' : 'red';
  const amountColor = type === 'income' ? 'green' : 'purple';

  const [status, setStatus] = useState(initialStatus);

  const handleStatusClick = () => {
    if (status === 'pending') {
      setStatus('approved');
    }
  };

  return (
    <tr>
      <td style={{ color: amountColor, fontWeight: 'bold' }}>{status}</td>
      <td>{creator}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td style={{ color: amountColor, fontWeight: 'bold' }}>{sign}${amount.toFixed(2)}</td>
    </tr>
  );
};

export default TransactionItem;
