import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { getTransactionsByClerkId } from '../apiServices/transaction';
import '../css/PieChart.css';
import {
  chartBackgroundColors,
  chartHoverBackgroundColors,
} from '../css/PieChartColors';
import { useParams } from 'react-router-dom';
import { getUsersByGroup } from '../apiServices/user-group';
import { useUser } from '@clerk/clerk-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState<
    ChartData<'pie', number[], string>
  >({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: chartBackgroundColors,
        hoverBackgroundColor: chartHoverBackgroundColors,
      },
    ],
  });
  const [showAmount, setShowAmount] = useState<boolean>(true); // State variable for toggling
  const params = useParams();
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsersByGroup(Number(params.id));
      const userExpenses: { [key: string]: number } = {};

      for (const otter of users) {
        const transactions = await getTransactionsByClerkId(
          otter.user.clerkId,
          params.id
        );
        userExpenses[
          user && otter.user.clerkId === user.id ? 'You' : otter.user.firstName
        ] = transactions.active.expense.confirmedExpenses.reduce(
          (acc, curr) => (showAmount ? acc + curr.amount : acc + 1),
          0
        );
      }

      // Update chartData state
      setChartData({
        labels: Object.keys(userExpenses),
        datasets: [
          {
            data: Object.values(userExpenses),
            backgroundColor: chartBackgroundColors,
            hoverBackgroundColor: chartHoverBackgroundColors,
          },
        ],
      });
    };
    fetchData();
  }, [showAmount, params]);

  return (
    <div className='pie-chart-container'>
      <h2>Who's Covering Otters</h2>
      <button
        onClick={() => setShowAmount(!showAmount)}
        className='pie-chart-toggle-btn'
      >
        {showAmount ? 'Total Amount' : 'How Many Expenses'}
      </button>
      <Pie data={chartData} style={{ marginBottom: '2rem' }} />
    </div>
  );
};

export default PieChart;
