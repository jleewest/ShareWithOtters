import { useTransactionContext } from '../index';

const LendingSummary = () => {
  const { transactions } = useTransactionContext();

  console.log(transactions);
  return (
    <div className='LendingSummary'>
      <h1>LendingSummary Render Here</h1>;
    </div>
  );
};

export default LendingSummary;
