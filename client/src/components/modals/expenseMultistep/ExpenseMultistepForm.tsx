import { Stepper, Step, StepLabel, Button, Dialog } from '@mui/material';
import { useState } from 'react';
import StepOne from './StepOne';
//import { useTransactionDataContext } from '../../..';
import { useUser } from '@clerk/clerk-react';

//const useStyles = makeStyles({
//  root: {
//    width: '50%',
//    margin: '6rem auto',
//    border: '1px solid #999',
//  },
//});

type AddExpenseFormProps = {
  openExpense: boolean;
  onCloseExpense: () => void;
};

const ExpenseMultiStepForm = ({ onCloseExpense, openExpense }) => {
  //const classes = useStyles();
  const { user } = useUser();
  if (!user) return null;

  //const { setTransactionData } = useTransactionDataContext();
  const [activeStep, setActiveStep] = useState(0);

  //CREATE STEPS
  function getSteps() {
    return ['ADD EXPENSE DETAILS', 'ADD OTTERS', 'ADD SPLIT', 'SUBMIT'];
  }
  const steps = getSteps();
  function getStepsContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <StepOne
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 1:
        return 'Step Two (ADD OTTERS)';
      case 2:
        return 'Step Three (ADD SPLIT)';
      case 3:
        return 'Step Four (SUBMIT)';
      default:
        return 'Unknown Step';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    //  setTransactionData({
    //    type: 'expense',
    //    date: date,
    //    transactor: user.id,
    //    transactee: [user.id],
    //    description: description,
    //    amount: [Number(amount)],
    //    notes: '',
    //  });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCancel = () => {
    setActiveStep(0);
    onCloseExpense();
  };

  return (
    <div className='ExpenseForm'>
      <Dialog
        open={openExpense}
        onClose={() => {
          onCloseExpense();
        }}
      >
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            'The Steps Completed'
          ) : (
            <>{getStepsContent(activeStep)}</>
          )}
        </>
        <Button onClick={handleCancel}>CANCEL</Button>
      </Dialog>
    </div>
  );
};

export default ExpenseMultiStepForm;
