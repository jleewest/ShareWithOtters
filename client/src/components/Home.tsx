import Dashboard from './Dashboard';
import '../css/Home.css';
import { Transaction, TransactionsContext } from '../index';
import { useState, useEffect } from 'react';
import { getTransactionsByClerkId } from '../apiServices/transaction';
import { useUser } from '@clerk/clerk-react';

function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  //user.id === ClerkId
  const { user } = useUser();

  //GET transactions from server
  useEffect(() => {
    getTransactionsByClerkId(user.id).then((data) => {
      setTransactions(data);
    });
  }, [user]);

  return (
    <div className='Home'>
      <header className='app-header'>
        <div>OtterShare</div>
      </header>
      <main className='home-container'>
        <TransactionsContext.Provider value={{ transactions, setTransactions }}>
          <Dashboard />
        </TransactionsContext.Provider>
      </main>
      <footer className='app-footer'>
        <a href='https://github.com/jleewest/IOU.git'>Open source code</a>
      </footer>
    </div>
  );
}

export default Home;
