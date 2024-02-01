import { useEffect, useState } from 'react';
import { TransactionWithUser, useTransactionContext } from '../index';
import { useUser } from '@clerk/clerk-react';
import WaveChart from './WaveChart';

type friendList = {
  clerkId: string;
  firstName: string;
  amount: number;
};

const LendingSummary = () => {
  const [lentUsers, setLentUsers] = useState<friendList[]>([]);
  const [netLent, setNetLent] = useState<number>();
  const [netOwed, setNetOwed] = useState<number>();
  const [netBalanceMsg, setNetBalanceMsg] = useState<string>();
  const [owedUsers, setOwedUsers] = useState<friendList[]>([]);
  const [friendList, setFriendList] = useState<friendList[]>([]);
  const { transactions } = useTransactionContext();
  const { user } = useUser();

  useEffect(() => {
    //
    if (transactions && user) {
      //create array of friends involved in all transactions
      const updatedFriendList: friendList[] = [];

      const transactionsAdded = [
        ...transactions.pending.expense,
        ...transactions.pending.payment,
        ...transactions.active.expense.confirmedExpenses,
        ...transactions.active.payment.received,
      ];

      const transactionsSubtracted = [
        ...transactions.active.expense.awaitedPendingExpenseSentToOther,
        ...transactions.active.expense.confirmedExpenses,
        ...transactions.active.payment.paid,
        ...transactions.active.payment.pendingPaid,
      ];

      transactionsAdded
        .filter((transaction) => transaction.transactor !== user.id)
        .forEach((transaction) => {
          updateFriendList(
            transaction.transactor,
            transaction,
            transaction.amount,
            updatedFriendList
          );
        });

      transactionsSubtracted
        .filter((transaction) => transaction.transactee !== user.id)
        .forEach((transaction) => {
          updateFriendList(
            transaction.transactee,
            transaction,
            -transaction.amount,
            updatedFriendList
          );
        });

      setFriendList(updatedFriendList);
    }
  }, [transactions]);

  //Sets net owe to each friend
  function updateFriendList(
    clerkId: string,
    transaction: TransactionWithUser,
    amount: number,
    updatedFriendList: friendList[]
  ) {
    const existingFriend = updatedFriendList.find(
      (friend) => friend.clerkId === clerkId
    );

    if (existingFriend) {
      existingFriend.amount += amount;
    } else {
      updatedFriendList.push({
        clerkId,
        firstName:
          clerkId === transaction.transactor
            ? transaction.userActor.firstName
            : transaction.userActee.firstName,
        amount: amount,
      });
    }
  }

  //sorts friends into owes you (lentUsers) and you owe (owedUsers)
  useEffect(() => {
    if (friendList) {
      const lentUserList: friendList[] = [];
      const owedUserList: friendList[] = [];

      friendList.forEach((friend) => {
        if (friend.amount < 0) {
          lentUserList.push(friend);
        } else if (friend.amount > 0) {
          owedUserList.push(friend);
        }
        setLentUsers(lentUserList);
        setOwedUsers(owedUserList);
      });
    }
  }, [friendList]);

  //calculate combine total for net lent to
  useEffect(() => {
    if (lentUsers) {
      let sum: number = 0;
      lentUsers.forEach((user) => (sum += -user.amount));
      setNetLent(sum);
    }
  }, [lentUsers]);

  //calculate combine total for net owed
  useEffect(() => {
    if (owedUsers) {
      let sum: number = 0;
      owedUsers.forEach((user) => (sum += user.amount));
      setNetOwed(sum);
    }
  }, [owedUsers]);

  //combine total for current balance and set message
  useEffect(() => {
    if (netOwed && netLent) {
      let balanceMsg;
      let netBalance = netOwed - netLent;
      if (netBalance === 0) {
        balanceMsg = 'All Otters paid up!';
      }
      if (netBalance > 0) {
        balanceMsg = `You owe: $${netBalance}`;
      }
      if (netBalance < 0) {
        balanceMsg = `You are owed: $${-netBalance}`;
      }
      if (balanceMsg) {
        setNetBalanceMsg(balanceMsg);
      }
    }
  }, [netOwed, netLent]);

  console.log(netLent);
  console.log(netOwed);
  console.log(netBalanceMsg);
  return (
    <div className='LendingSummary'>
      {netBalanceMsg ? (
        <div>
          <h2>Current Balance: {netBalanceMsg}</h2>
          <WaveChart />
          {lentUsers.length > 0 ? (
            <div>
              <h2>Otters still owe you ${netLent}</h2>
              {lentUsers.map((user) => {
                return (
                  <p key={user.clerkId}>
                    {user.firstName} owes you ${-user.amount}
                  </p>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}

          {owedUsers.length > 0 ? (
            <div>
              <h2>You still owe Otters ${netOwed}</h2>
              {owedUsers.map((user) => {
                return (
                  <p key={user.clerkId}>
                    You owe {user.firstName} ${user.amount}
                  </p>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LendingSummary;
