import Home from '../components/Home';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../css/DarkModeToggle';
import { SignOutButton } from '@clerk/clerk-react';

const Display = () => {
  return (
    <div className='Home'>
      <header className='app-header'>
        <Link className='otter-home' to='/'>
          ShareWithOtters
        </Link>
        <div className='header-right'>
          <div className='login-dark-mode'>
            <DarkModeToggle />
          </div>
          <SignOutButton afterSignOutUrl='/'>
            <button className='primary-btn logout-button'>Logout</button>
          </SignOutButton>
        </div>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/group/:id' element={<Dashboard />} />
        </Routes>
      </main>
      <footer className='app-footer'>
        <a href='https://github.com/jleewest/IOU.git'>Open source code</a>
      </footer>
    </div>
  );
};

export default Display;
