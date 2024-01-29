import '../css/Dashboard.css';
import GroupOptions from './GroupOptions';
import WaveChart from './WaveChart';
import TransactionTable from './TransactionTable';
import PieChart from './PieChart';
import LendingSummary from './LendingSummary';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Dashboard = () => {
  return (
    <div className='Dashboard'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GroupOptions />

        {/* Render only pending transactions here */}
        <TransactionTable status={'pending'} />

        <WaveChart />
        <LendingSummary />

        {/* Render only approved transactions here */}
        <TransactionTable status={'active'} />

        <PieChart />
      </LocalizationProvider>
    </div>
  );
};

export default Dashboard;
