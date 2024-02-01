import '../css/Dashboard.css';
import GroupOptions from './GroupOptions';
import RecentTransactionTable from './RecentTransactionTable';
import PendingTransactionTable from './PendingTransactionTable';
import PieChart from './PieChart';
import LendingSummary from './LendingSummary';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getTransactionsByClerkId } from '../apiServices/transaction';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { TransactionReturn } from '../index';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionReturn>();
  const { user } = useUser();

  // Function to refresh the transactions data after a new payment is added
  const refreshTransactions = async () => {
    if (user) {
      const updatedTransactions = await getTransactionsByClerkId(user.id);
      setTransactions(updatedTransactions);
    }
  };

  console.log(transactions);

  return (
    <div className='Dashboard'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GroupOptions refreshTransactions={refreshTransactions} />
        {/* Render only pending transactions here */}
        <PendingTransactionTable />
        {/* Render summary of debts here */}
        <LendingSummary />
        {/* Render only approved transactions here */}
        <RecentTransactionTable />

        <PieChart />
      </LocalizationProvider>
    </div>
  );
};

export default Dashboard;
