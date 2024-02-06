import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { getAllUsers } from '../../apiServices/user';
import { useEffect, useState } from 'react';
import { User, User_GroupUsers } from '../..';
import { addUserToGroup, getUsersByGroup } from '../../apiServices/user-group';
import { useParams } from 'react-router-dom';

type InviteFormProps = {
  open: boolean;
  onClose: () => void;
};

const InviteForm = ({ open, onClose }: InviteFormProps) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<User | null>();
  const [allUsersInGroup, setAllUsersInGroup] = useState<User_GroupUsers[]>([]);
  const params = useParams();

  useEffect(() => {
    getUsersByGroup(Number(params.id)).then((data) => {
      setAllUsersInGroup(data);
    });
  }, [params]);

  useEffect(() => {
    getAllUsers().then((data) => {
      const filteredUsers = data.filter(
        (users) =>
          !allUsersInGroup.some(
            (groupUser) => groupUser.user.clerkId === users.clerkId
          )
      );
      setAllUsers(filteredUsers);
    });
  }, [allUsersInGroup]);

  // Form submission handler (to be implemented)
  const handleSubmit = () => {
    addUserToGroup({
      userId: selectedFriends?.clerkId,
      groupId: Number(params.id),
    });
    // Placeholder for form submission logic
    console.log('Form submitted');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add an Otter</DialogTitle>
      <DialogContent>
        <form action=''>
          <Autocomplete
            options={allUsers}
            getOptionLabel={(option) =>
              `${option.firstName} ${option.lastName}`
            }
            sx={{ width: 300 }}
            onChange={(_, newValue) => setSelectedFriends(newValue)}
            renderInput={(params) => (
              <TextField {...params} label='Select friends' />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {selectedFriends && <Button onClick={handleSubmit}>Submit</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default InviteForm;
