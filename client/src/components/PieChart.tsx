import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAllUsers } from '../apiServices/user';
import { getTransactionsByClerkId } from '../apiServices/transaction';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  });

  const fetchData = async () => {
    const users = await getAllUsers();
    const userExpenses: { [key: string]: number } = {};

    for (const user of users) {
      const transactions = await getTransactionsByClerkId(user.clerkId);
      userExpenses[user.firstName] = transactions.active.expense.confirmedExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    }

    setChartData({
      labels: Object.keys(userExpenses),
      datasets: [
        {
          data: Object.values(userExpenses),
          backgroundColor: [
            '#FF6384', // Radical Red
            '#36A2EB', // Picton Blue
            '#FFCE56', // Supernova
            '#9966FF', // Amethyst
            '#4BC0C0', // Medium Turquoise
            '#c931a9', // Steel Pink
            '#FF9F40', // Orange Peel
            '#6ACF53', // Sushi
          ],
          hoverBackgroundColor: [
            '#FF6384', // Radical Red
            '#36A2EB', // Picton Blue
            '#FFCE56', // Supernova
            '#9966FF', // Amethyst
            '#4BC0C0', // Medium Turquoise
            '#c931a9', // Steel Pink
            '#FF9F40', // Orange Peel
            '#6ACF53', // Sushi
          ]
        }
      ]
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Expense Distribution</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
