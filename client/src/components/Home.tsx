import Dashboard from './Dashboard';
import '../css/Home.css';
import { TransactionReturn, TransactionsContext } from '../index';
import { useState, useEffect } from 'react';
import { getTransactionsByClerkId } from '../apiServices/transaction';
import { addUser } from '../apiServices/user';
import { useUser } from '@clerk/clerk-react';
import { SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

function Home() {
  const [transactions, setTransactions] = useState<TransactionReturn>([]);
  //user.id === ClerkId
  const { user } = useUser();

  //POST user to DB if newUser
  useEffect(() => {
    if (user) {
      addUser({
        clerkId: user.id,
        firstName: user.firstName || 'no first name',
        lastName: user.lastName || 'no last name',
        email: user.primaryEmailAddress?.emailAddress || 'no email',
      });
    }
  }, [user]);

  //GET transactions from server
  useEffect(() => {
    if (user) {
      getTransactionsByClerkId(user.id).then((data) => {
        setTransactions(data);
      });
    }
  }, [user]);

  if (!user) {
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
          <div>
            Something has gone 🦖RAW-WRong! Please logout and log back in
          </div>
        </main>
        <footer className='app-footer'>
          <a href='https://github.com/jleewest/IOU.git'>Open source code</a>
        </footer>
      </div>
    );
  }

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
