import React, { useState } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Link, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setDeterminingFactor, determineAgreementType, setCurrentStep} from '../../store/slices/wizardSlice';
import { RootState } from '../../store/store';
import { AgreementType } from '../../types/types';
import InfoBox from './InfoBox';
import WizardNavigation from './WizardNavigation';

const AgreementTypeStep: React.FC = () => {
  const dispatch = useDispatch();
  const currentAgreement = useSelector((state: RootState) => state.agreement.currentAgreement);
  const agreementType = useSelector((state: RootState) => state.wizard.agreementType);

  // Initialize selected option based on current agreement type
  const getInitialOption = () => {
    if (currentAgreement) {
      if (currentAgreement.type === AgreementType.MOA) {
        return 'resources';
      } else if (currentAgreement.type === AgreementType.MOU) {
        return 'understanding';
      }
    }
    return '';
  };

  const [selectedOption, setSelectedOption] = useState<string>(getInitialOption());

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedOption(value);

    // Reset all factors
    dispatch(setDeterminingFactor({ factor: 'involvesResources', value: false }));
    dispatch(setDeterminingFactor({ factor: 'involvesReimbursement', value: false }));
    dispatch(setDeterminingFactor({ factor: 'involvesFunding', value: false }));
    dispatch(setDeterminingFactor({ factor: 'documentingUnderstanding', value: false }));
    dispatch(setDeterminingFactor({ factor: 'partiesAllDoD', value: true }));

    // Set appropriate factors based on selection
    if (value === 'resources') {
      dispatch(setDeterminingFactor({ factor: 'involvesResources', value: true }));
    } else if (value === 'understanding') {
      dispatch(setDeterminingFactor({ factor: 'documentingUnderstanding', value: true }));
    }
  };

  const handleNext = () => {
    dispatch(determineAgreementType());
    dispatch(setCurrentStep(2)); // Set the next step to 2.
  };

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <LinearProgress
        variant="determinate"
        value={20}
        sx={{ mb: 3, height: 10, bgcolor: '#eeeeee' }}
      />

      <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>
        Agreement Type Selection
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: '#eeeeee', pb: 1, mb: 3 }} />

      <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
        What type of support relationship do you need to document?
      </Typography>

      <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange}
        sx={{ mb: 3 }}
      >
        <FormControlLabel
          value="resources"
          control={<Radio color="primary" />}
          label="Commitment of resources between DoD Components"
        />
        <FormControlLabel
          value="understanding"
          control={<Radio color="primary" />}
          label="Understanding between DoD Components (no resources)"
        />
      </RadioGroup>

      <InfoBox title="DoDI 4000.19 Guidance:">
        <Typography paragraph sx={{ mt: 1 }}>
          MOA: Used when transfer of funds or reimbursement is involved.
        </Typography>
        <Typography>
          MOU: Used when no transfer of funds between parties is involved.
        </Typography>
      </InfoBox>

      <Link
        href="https://www.esd.whs.mil/Portals/54/Documents/DD/issuances/dodi/400019p.pdf"
        color="primary"
        underline="hover"
        sx={{ mt: 2, display: 'block', fontSize: '0.875rem' }}
        target="_blank" // Added to open the link in a new tab
        rel="noopener noreferrer" // Added for security best practices
      >
        Learn more about agreement types in DoDI 4000.19
      </Link>


      <Box sx={{ flexGrow: 1 }} />

      <WizardNavigation
        nextDisabled={!selectedOption}
        onNext={handleNext}
      />
    </Box>
  );
};

export default AgreementTypeStep;
