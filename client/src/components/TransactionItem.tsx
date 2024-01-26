import React from 'react';

type TransactionItemProps = {
  status: 'approved' | 'disputed';
  type: 'expense' | 'income';
  creator: string;
  date: string;
  description: string;
  amount: number;
};

const TransactionItem = ({ status, type, creator, date, description, amount }: TransactionItemProps) => {
  const sign = type === 'expense' ? '-' : '+';
  const statusColor = status === 'approved' ? 'green' : 'red';
  const amountColor = type === 'income' ? 'green' : 'purple';

  return (
    <tr>
      <td style={{ color: statusColor, fontWeight: 'bold' }}>{status}</td>
      <td>{creator}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td style={{ color: amountColor, fontWeight: 'bold' }}>{sign}${amount.toFixed(2)}</td>
    </tr>
  );
};

export default TransactionItem;
