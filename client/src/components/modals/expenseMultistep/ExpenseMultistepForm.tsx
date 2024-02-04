import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Dialog,
  createTheme,
  ThemeProvider,
} from '@mui/material';
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

//FORM STYLE THEME
const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.Mui-completed': {
            color: 'var(--secondary-color)',
          },
          '&.Mui-active': {
            color: 'var(--light-accent-color)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'var(--secondary-color)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: 'var(--light-accent-color)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--light-accent-color)',
            },
          },
        },
      },
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <div className='MultistepExpenseForm'>
        <Dialog
          open={openExpense}
          onClose={() => {
            onCloseExpense();
          }}
        >
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            style={{ padding: '1.5rem' }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div style={{ padding: '1rem 1.5rem' }}>
            {activeStep === steps.length ? (
              submissionResponse.length > 0 ? (
                <h2>Your transaction has been added!</h2>
              ) : (
                <h2>
                  Whoops! Something went wrong. Try adding your transaction
                  again.
                </h2>
              )
            ) : (
              <h2>{getStepsContent(activeStep)}</h2>
            )}
          </div>
          <div
            style={{
              padding: '0 1rem 1rem 0',
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <Button onClick={handleCancel}>
              {' '}
              {activeStep === steps.length ? 'FINISH' : 'CANCEL'}
            </Button>
          </div>
        </Dialog>
      </div>
    </ThemeProvider>
  );
};

export default ExpenseMultiStepForm;
