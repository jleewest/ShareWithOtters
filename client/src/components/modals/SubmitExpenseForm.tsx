import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Transaction } from '../..';
import { createTransaction } from '../../apiServices/transaction';
import { useTransactionDataContext } from '../..';
import { useState } from 'react';
import SubmissionResponse from './SubmissionResponse';

type SubmitExpenseFormProps = {
  openSubmitForm: boolean;
  onCloseSubmitForm: () => void;
};

const SubmitExpenseForm = ({
  openSubmitForm,
  onCloseSubmitForm,
}: SubmitExpenseFormProps) => {
  const [isSubmissionResponseOpen, setSubmissionResponseOpen] = useState(false);
  const openSubmissionResponse = () => setSubmissionResponseOpen(true);
  const closeSubmissionResponse = () => setSubmissionResponseOpen(false);
  const [submissionResponse, setSubmissionResponse] = useState<Transaction[]>(
    []
  );
  const { transactionData } = useTransactionDataContext();

  const handleSubmission = () => {
    console.log(transactionData);
    createTransaction(transactionData).then((data) => {
      setSubmissionResponse(data);
    });
    openSubmissionResponse();
    onCloseSubmitForm();
  };

  return (
    <div className='SubmitExpenseForm'>
      <Dialog open={openSubmitForm} onClose={onCloseSubmitForm}>
        {transactionData ? (
          <div>
            <DialogTitle>Ready to Submit?</DialogTitle>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <DialogActions>
          <Button onClick={onCloseSubmitForm}>Cancel</Button>
          <Button onClick={handleSubmission}>Submit</Button>
        </DialogActions>
      </Dialog>
      <SubmissionResponse
        openSubmissionResponse={isSubmissionResponseOpen}
        onCloseSubmissionResponse={closeSubmissionResponse}
        submissionResponse={submissionResponse}
      />
    </div>
  );
};

export default SubmitExpenseForm;
