import '../css/Home.css';
import { useState, useEffect } from 'react';
import { addUser } from '../apiServices/user';
import { useUser } from '@clerk/clerk-react';
import { SignOutButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import DarkModeToggle from '../css/DarkModeToggle';
import { getGroupsByClerkId } from '../apiServices/user-group';
import { User_GroupWithTransactions } from '../index';
import GroupDetails from './GroupDetails';

type GroupDetails = {
  title: string;
  description: string;
};

function Home() {
  const [userGroups, setUserGroups] = useState<User_GroupWithTransactions[]>(
    []
  );
  const { user } = useUser();
  if (!user) {
    return null;
  }

  //POST user to DB if newUser
  useEffect(() => {
    if (user) {
      addUser({
        clerkId: user.id,
        firstName: user.firstName || 'no first name',
        lastName: user.lastName || 'no last name',
        email: user.primaryEmailAddress?.emailAddress || 'no email',
      });
    }
  }, [user]);

  //get all group connected to user
  useEffect(() => {
    if (user) {
      getGroupsByClerkId(user.id).then((data) => {
        setUserGroups(data);
      });
    }
  }, [user]);

  console.log(userGroups);

  return (
    <div className='Home'>
      <header className='app-header'>
        <Link className='otter-home' to='/'>
          ShareWithOtter
        </Link>
        <div className='header-right'>
          <div className='login-dark-mode'>
            <DarkModeToggle />
          </div>
          <SignOutButton afterSignOutUrl='/'>
            <button className='primary-btn logout-button'>Logout</button>
          </SignOutButton>
        </div>
      </header>
      <main className='home-container'>
        <div>
          <div className='group-title'>
            <h2 className='your-groups'>Your Otter Rafts</h2>
            <button className='primary-btn add-family'>Add Raft</button>
          </div>
          {/* List of user's groups */}
          <div className='group-display'>
            {userGroups.length > 0 ? (
              userGroups.map((group) => {
                return (
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={{ pathname: `/group/${group.groupId}` }}
                    key={group.groupId}
                  >
                    <GroupDetails group={group.group} />
                  </Link>
                );
              })
            ) : (
              <p>There are no groups yet</p>
            )}
          </div>
        </div>
      </main>
      <footer className='app-footer'>
        <a href='https://github.com/jleewest/IOU.git'>Open source code</a>
      </footer>
    </div>
  );
}

export default Home;
