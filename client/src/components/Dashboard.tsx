import '../css/Dashboard.css';
import GroupOptions from './GroupOptions';
import RecentTransactionTable from './RecentTransactionTable';
import PendingTransactionTable from './PendingTransactionTable';
import PieChart from './PieChart';
import LendingSummary from './LendingSummary';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getTransactionsByClerkId } from '../apiServices/transaction';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { TransactionReturn, TransactionsContext } from '../index';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<TransactionReturn>();
  const params = useParams();
  const { user } = useUser();

  //GET transactions from server
  useEffect(() => {
    if (user) {
      getTransactionsByClerkId(user.id, params.id).then((data) => {
        setTransactions(data);
      });
    }
  }, [user, params]);

  // Function to refresh the transactions data after a new payment is added
  const refreshTransactions = async () => {
    if (user && params) {
      const updatedTransactions = await getTransactionsByClerkId(
        user.id,
        params.id
      );
      setTransactions(updatedTransactions);
    }
  };

  return (
    <div className='Dashboard'>
      <TransactionsContext.Provider value={{ transactions, setTransactions }}>
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
      </TransactionsContext.Provider>
    </div>
  );
};

export default Dashboard;
