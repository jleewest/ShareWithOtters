import { Stepper, Step, StepLabel, Button, Dialog } from '@mui/material';
import { useState } from 'react';
import StepOne from './StepOne';
import { useTransactionDataContext, Transaction } from '../../..';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import ReviewTransaction from './ReviewTransaction';
import { createTransaction } from '../../../apiServices/transaction';

type AddExpenseFormProps = {
  openExpense: boolean;
  onCloseExpense: () => void;
};

const ExpenseMultiStepForm = ({
  onCloseExpense,
  openExpense,
}: AddExpenseFormProps) => {
  const { setTransactionData, transactionData } = useTransactionDataContext();
  const [activeStep, setActiveStep] = useState(0);
  const [submissionResponse, setSubmissionResponse] = useState<Transaction[]>(
    []
  );

  //CREATE STEPS
  function getSteps() {
    return [
      'ADD EXPENSE DETAILS',
      'ADD OTTERS',
      'ADD SPLIT',
      'REVIEW & SUBMIT',
    ];
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
        return (
          <StepTwo
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 2:
        return (
          <StepThree
            handleBack={handleBack}
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 3:
        return (
          <ReviewTransaction
            handleBack={handleBack}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
            activeStep={activeStep}
            steps={steps}
          />
        );
      default:
        return 'Unknown Step';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    createTransaction(transactionData).then((data) => {
      setSubmissionResponse(data);
    });
  };

  const handleCancel = () => {
    setActiveStep(0);
    setTransactionData({
      type: 'expense',
      date: '',
      transactor: '',
      transactee: [],
      description: '',
      amount: [],
      notes: '',
    });
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
        <div>
          {activeStep === steps.length ? (
            submissionResponse.length > 0 ? (
              <h2>Your transaction has been added!</h2>
            ) : (
              <h2>
                Whoops! Something went wrong. Try adding your transaction again.
              </h2>
            )
          ) : (
            <h2>{getStepsContent(activeStep)}</h2>
          )}
        </div>
        <Button onClick={handleCancel}>
          {' '}
          {activeStep === steps.length ? 'FINISH' : 'CANCEL'}
        </Button>
      </Dialog>
    </div>
  );
};

export default ExpenseMultiStepForm;
