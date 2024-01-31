import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Transaction } from '../../index';

type SubmissionResponseProps = {
  openSubmissionResponse: boolean;
  onCloseSubmissionResponse: () => void;
  submissionResponse: Transaction[];
};

const SubmissionResponse = ({
  openSubmissionResponse,
  onCloseSubmissionResponse,
  submissionResponse,
}: SubmissionResponseProps) => {
  return (
    <div className='SubmissionResponse'>
      <Dialog open={openSubmissionResponse} onClose={onCloseSubmissionResponse}>
        {submissionResponse ? (
          <DialogTitle>Your transaction has been added!</DialogTitle>
        ) : (
          <DialogTitle>
            Whoops! Something went wrong. Try adding your transaction again.
          </DialogTitle>
        )}
        <DialogActions>
          <Button onClick={onCloseSubmissionResponse}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubmissionResponse;
