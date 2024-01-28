import Dashboard from './Dashboard';
import '../css/Home.css';
import logo from '../assets/otter-logo.svg';

function Home() {
  return (
    <div className='Home'>
      <header className='app-header'>
        <img src={logo} alt='logo' />
        <div>OtterShare</div>
      </header>
      <main className='home-container'>
        <Dashboard />
      </main>
      <footer className='app-footer'>
        <a href='https://github.com/jleewest/IOU.git'>Open source code</a>
      </footer>
    </div>
  );
}

export default Home;
