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
  const { user } = useUser()
  const [transactions, setTransactions] = useState<Transaction[]>([]);


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

  // Function to refresh the transactions data after a new payment is added
  const refreshTransactions = async () => {
    if (user) {
      const updatedTransactions = await getTransactionsByClerkId(user.id);
      setTransactions(updatedTransactions);
    }
  };
  return (
    <div className='Dashboard'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GroupOptions refreshTransactions={refreshTransactions}/>

        {/* Render only pending transactions here */}
        <TransactionTable transactions={transactions} status={'pending'} />

        <WaveChart />
        <LendingSummary />

        {/* Render only approved transactions here */}
        <TransactionTable transactions={transactions} status={'active'} />

        <PieChart />
      </LocalizationProvider>
    </div>
  );
};

export default Dashboard;
