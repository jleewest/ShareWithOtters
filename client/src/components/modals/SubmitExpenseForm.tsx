import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Transaction } from '../..';

type SubmitExpenseFormProps = {
  openSubmitForm: boolean;
  onCloseSubmitForm: () => void;
  submissionResponse: Transaction[];
};

const SubmitExpenseForm = ({
  openSubmitForm,
  onCloseSubmitForm,
  submissionResponse,
}: SubmitExpenseFormProps) => {
  return (
    <div className='SubmitExpenseForm'>
      <Dialog open={openSubmitForm} onClose={onCloseSubmitForm}>
        {submissionResponse ? (
          <DialogTitle>Your transaction has been added!</DialogTitle>
        ) : (
          <DialogTitle>
            Whoops! Something went wrong. Try adding your transaction again.
          </DialogTitle>
        )}
        <DialogActions>
          <Button onClick={onCloseSubmitForm}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SubmitExpenseForm;
