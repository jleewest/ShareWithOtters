import '../css/Home.css';
import { useState, useEffect } from 'react';
import { addUser } from '../apiServices/user';
import { useUser } from '@clerk/clerk-react';
import { getGroupsByClerkId } from '../apiServices/user-group';
import { User_GroupWithTransactions } from '../index';
import { GroupDetails } from './GroupDetails';
import { Link } from 'react-router-dom';
import RaftForm from './modals/AddRaftForm';

type GroupDetails = {
  title: string;
  description: string;
};

function Home() {
  const [userGroups, setUserGroups] = useState<User_GroupWithTransactions[]>(
    []
  );
  const [isRaftFormOpen, setRaftFormOpen] = useState(false);
  const openRaftForm = () => setRaftFormOpen(true);
  const closeRaftForm = () => setRaftFormOpen(false);
  const { user } = useUser();

  //POST user to DB if newUser
  useEffect(() => {
    if (user) {
      addUser({
        clerkId: user.id,
        firstName: user.firstName ?? 'no first name',
        lastName: user.lastName ?? 'no last name',
        email: user.primaryEmailAddress?.emailAddress ?? 'no email',
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

  return (
    <div className='Home'>
      <div className='home-container'>
        <div>
          <div className='group-title'>
            <h2 className='your-groups'>Your Otter Rafts</h2>
            <button className='primary-btn add-family' onClick={openRaftForm}>
              Add Raft
            </button>
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
      </div>
      <RaftForm open={isRaftFormOpen} onClose={closeRaftForm} />
    </div>
  );
}

export default Home;
