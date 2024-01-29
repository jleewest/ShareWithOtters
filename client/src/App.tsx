import Home from './components/Home';
import './css/App.css';
import { SignedOut, SignedIn, SignInButton } from '@clerk/clerk-react';

function App() {
  return (
    <div className='app-container'>
      <SignedOut>
        <h1>Login Page</h1>
        <SignInButton redirectUrl='/'>
          <button className='login-button primary-button'>Log In</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Home />
      </SignedIn>
    </div>
  );
}

export default App;
