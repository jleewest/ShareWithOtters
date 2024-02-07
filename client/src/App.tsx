import './css/App.css';
import DarkModeToggle from './css/DarkModeToggle';
import { SignedOut, SignedIn, SignInButton } from '@clerk/clerk-react';
import logo from './assets/otter-logo.svg';
import Display from './components/Display';

function App() {
  return (
    <div className='App'>
      <SignedOut>
        <div className='signed-out'>
          <div className='logout-dark-mode'>
            <DarkModeToggle />
          </div>
          <h1>ShareWithOtters</h1>
          <img className='login-logo' src={logo} alt='logo' />
          <SignInButton redirectUrl='/'>
            <button className='login-btn'>Log In</button>
          </SignInButton>
        </div>
      </SignedOut>
      <div className='signed-in'>
        <SignedIn>
          <Display />
        </SignedIn>
      </div>
    </div>
  );
}

export default App;
