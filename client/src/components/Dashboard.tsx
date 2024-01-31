import '../css/Dashboard.css';
import GroupOptions from './GroupOptions';
import WaveChart from './WaveChart';
import TransactionTable from './TransactionTable';
import PieChart from './PieChart';
import LendingSummary from './LendingSummary';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { getTransactionsByClerkId } from '../apiServices/transaction';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Transaction } from '../index';

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useUser();

  useEffect(() => {
    // Fetch transactions for the logged-in user
    const fetchTransactions = async () => {
      if (user) {
        const updatedTransactions = await getTransactionsByClerkId(user.id);
        setTransactions(updatedTransactions);
      }
    };

    fetchTransactions();
  }, [user]);

  if (!user) {
    // Handle the case where user is null or undefined
    return console.error('Error retrieving clerkId');
  }
  const clerkUserId = user.id;
  console.log(`Clerk User ID: ${clerkUserId}`);

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
        {/*<TransactionTable
          status={'pending'}
          refreshTransactions={refreshTransactions}
        />*/}

        <WaveChart />
        <LendingSummary />

        {/* Render only approved transactions here */}
        {/*<TransactionTable
          status={'active'}
          refreshTransactions={refreshTransactions}
        />*/}

        <PieChart />
      </LocalizationProvider>
    </div>
  );
};

export default Dashboard;
