import { useTransactionContext } from '../index';
import { useState } from 'react';

const LendingSummary = () => {
  const [lentUsers, setLentUsers] = useState();
  const [owedUsers, setOwedUser] = useState();
  const { transactions } = useTransactionContext();

  console.log(transactions);
  return (
    <div className='LendingSummary'>
      <h1>LendingSummary Render Here</h1>;<h2>You have lent to $200 Otters</h2>
      {/*{lentUsers.length > 0 ? (lentUsers.map((user)=>{return <p>You have lent {user.firstName} ${user.amount} </p>;})):(<p>No one owes you money</p>)}*/}
      <h2>Otters have lent you $300</h2>
      {/*{owedUsers.length > 0 ? (owedUsers.map((user)=>{return <p>{user.firstName} lent you ${user.amount} </p>;})):(<p>No one owes you money</p>)}*/}
    </div>
  );
};

export default LendingSummary;
