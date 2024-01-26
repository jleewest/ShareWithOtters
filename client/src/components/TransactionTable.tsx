import React from "react"
import TransactionItem from "./TransactionItem"

type Transaction = {
  creator: string;
  date: string;
  description: string;
  amount: number;
}

type TransactionTableProps = {
  transactions: Transaction[];
};

const TransactionTable = ({ transactions}: TransactionTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Creator</th>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={index}
            creator={transaction.creator}
            date={transaction.date}
            description={transaction.description}
            amount={transaction.amount}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable