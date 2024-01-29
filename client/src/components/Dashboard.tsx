import '../css/Dashboard.css';
import GroupOptions from './GroupOptions';
import WaveChart from './WaveChart';
import TransactionTable from './TransactionTable';
import PieChart from './PieChart';
import LendingSummary from './LendingSummary';

const Dashboard = () => {
  return (
    <div>
      <GroupOptions />

      {/* Render only pending transactions here */}
      <TransactionTable status={'pending'} />

      <WaveChart />
      <LendingSummary />

      {/* Render only approved transactions here */}
      <TransactionTable status={'active'} />

      <PieChart />

      {/* Modals for forms */}
    </div>
  );
};

export default Dashboard;
