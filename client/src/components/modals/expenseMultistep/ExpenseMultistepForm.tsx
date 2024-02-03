import { Stepper, Step, StepLabel, Button, Dialog } from '@mui/material';
import { useState } from 'react';
import StepOne from './StepOne';
import { useTransactionDataContext } from '../../..';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import ReviewTransaction from './ReviewTransaction';

type AddExpenseFormProps = {
  openExpense: boolean;
  onCloseExpense: () => void;
};

const ExpenseMultiStepForm = ({
  onCloseExpense,
  openExpense,
}: AddExpenseFormProps) => {
  const { setTransactionData } = useTransactionDataContext();
  const [activeStep, setActiveStep] = useState(0);

  //CREATE STEPS
  function getSteps() {
    return [
      'ADD EXPENSE DETAILS',
      'ADD OTTERS',
      'ADD SPLIT',
      'REVIEW',
      'SUBMIT',
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
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 2:
        return (
          <StepThree
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 3:
        return (
          <ReviewTransaction
            handleNext={handleNext}
            activeStep={activeStep}
            steps={steps}
          />
        );
      case 4:
        return 'Step Four (SUBMIT)';
      default:
        return 'Unknown Step';
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  //const handleBack = () => {
  //  setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //};

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
