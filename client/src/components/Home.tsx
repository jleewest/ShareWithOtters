import Dashboard from './Dashboard';
import '../css/Home.css';

function Home() {
  return (
    <div className='Home'>
      <header className='app-header'>
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
