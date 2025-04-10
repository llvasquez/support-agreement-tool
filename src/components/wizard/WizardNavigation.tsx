import React from 'react';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, resetWizard } from '../../store/slices/wizardSlice';
import { clearCurrentAgreement } from '../../store/slices/agreementSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';

interface WizardNavigationProps {
  onCancel?: () => void;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  nextLabel?: string;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  onCancel,
  onNext,
  onBack,
  nextDisabled = false,
  backDisabled = false,
  nextLabel = 'Continue'
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state: RootState) => state.wizard.currentStep);
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      dispatch(setCurrentStep(Math.max(1, currentStep - 1)));
    }
  };

  // Function to handle returning to the dashboard
  const handleReturnToDashboard = () => {
    // Reset the wizard state
    dispatch(resetWizard());
    // Clear the current agreement
    dispatch(clearCurrentAgreement());
    // Navigate back to the dashboard
    navigate('/dashboard');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
      <Button
        variant="outlined"
        color="inherit"
        onClick={onCancel || handleReturnToDashboard}
        sx={{ borderColor: '#dddddd', color: '#555555' }}
      >
        Cancel
      </Button>

      {currentStep > 1 && (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBack}
          disabled={backDisabled}
        >
          Back
        </Button>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={handleNext}
        disabled={nextDisabled}
      >
        {nextLabel}
      </Button>
    </Box>
  );
};

export default WizardNavigation;
