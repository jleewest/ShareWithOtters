import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { postGroup } from '../../apiServices/group';

type RaftFormProps = {
  open: boolean;
  onClose: () => void;
};

const RaftForm = ({ open, onClose }: RaftFormProps) => {
  const { user } = useUser();
  const [raftName, setRaftName] = useState<string>();
  const [raftDescription, setRaftDescription] = useState<string>();

  const handleSubmit = async () => {
    // CREATE NEW GROUP
    if (raftName && raftDescription && user) {
      const newRaft = {
        title: raftName,
        description: raftDescription,
        user: user.id,
      };

      try {
        await postGroup(newRaft);
        console.log(raftName, raftDescription);
        setRaftName('');
        setRaftDescription('');
      } catch (error) {
        console.error('Failed to create payment transaction', error);
      }
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Raft</DialogTitle>
      <DialogContent>
        {/* Note form fields */}
        <TextField
          autoFocus
          margin='dense'
          id='raft-name'
          label='Raft Name'
          type='text'
          fullWidth
          multiline
          rows={1}
          value={raftName}
          onChange={(e) => setRaftName(e.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          id='raft-description'
          label='Description'
          type='text'
          fullWidth
          multiline
          value={raftDescription}
          onChange={(e) => setRaftDescription(e.target.value)}
          rows={4}
        />
        {/* more fields here*/}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {raftName && raftDescription && (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RaftForm;
