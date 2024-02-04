import { useUser } from '@clerk/clerk-react';
import { useTransactionDataContext } from '../../index';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import ExpenseMultiStepForm from './expenseMultistep/ExpenseMultistepForm';

type AddExpenseFormProps = {
  openExpense: boolean;
  onCloseExpense: () => void;
};

const AddExpenseForm = ({
  openExpense,
  onCloseExpense,
}: AddExpenseFormProps) => {
  const { setTransactionData } = useTransactionDataContext();
  const { user } = useUser();
  if (!user) return null;

  const resetTransactionData = () => {
    setTransactionData({
      type: 'expense',
      date: '',
      transactor: user.id,
      transactee: [user.id],
      description: '',
      amount: [],
      notes: '',
    });
  };

  return (
    <div className='AddExpenseForm'>
      <Dialog
        open={openExpense}
        onClose={() => {
          resetTransactionData();
          onCloseExpense();
        }}
      >
        <DialogTitle>Add an Expense</DialogTitle>
        <ExpenseMultiStepForm
          onCloseExpense={onCloseExpense}
          openExpense={openExpense}
        ></ExpenseMultiStepForm>
      </Dialog>
    </div>
  );
};

export default AddExpenseForm;
