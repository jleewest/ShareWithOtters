import React from 'react';

type TransactionItemProps = {
  creator: string;
  date: string;
  description: string;
  amount: number;
};

const TransactionItem = ({ creator, date, description, amount }: TransactionItemProps) => {
  return (
    <tr>
      <td>{creator}</td>
      <td>{date}</td>
      <td>{description}</td>
      <td>${amount.toFixed(2)}</td>
    </tr>
  );
};

export default TransactionItem;