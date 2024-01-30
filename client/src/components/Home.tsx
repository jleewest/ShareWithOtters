import Dashboard from './Dashboard';
import '../css/Home.css';
import { Transaction, TransactionsContext } from '../index';
import { useState, useEffect } from 'react';
import { getTransactionsByClerkId } from '../apiServices/transaction';
import { addUser } from '../apiServices/user';
import { useUser } from '@clerk/clerk-react';
import { SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  //user.id === ClerkId
  const { user } = useUser();

  //POST user to DB if newUser
  useEffect(() => {
    addUser({
      clerkId: user.clerkId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }, [user]);

  //GET transactions from server
  useEffect(() => {
    getTransactionsByClerkId(user.id).then((data) => {
      setTransactions(data);
    });
  }, [user]);

  return (
    <div className='Home'>
      <header className='app-header'>
        <Link className='otter-home' to='/'>
          OtterShare
        </Link>
        <SignOutButton afterSignOutUrl='/'>
          <button className='logout-button'>Logout</button>
        </SignOutButton>
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
