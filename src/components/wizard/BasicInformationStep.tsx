import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  LinearProgress, 
  SelectChangeEvent 
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {  
  setFirstParty,
  setFirstPartyAcronym,
  setSecondParty,
  setSecondPartyAcronym,
  setSubject,
  setAgreementNumber,
  updateClassification,
} from '../../store/slices/agreementSlice';
import { ClassificationLevel } from '../../types/types';
import { RootState } from '../../store/store';
import WizardNavigation from './WizardNavigation';
import { setCurrentStep } from '../../store/slices/wizardSlice';

const BasicInformationStep: React.FC = () => {
  const dispatch = useDispatch();
  
  // Selectors
  const classificationLevel = useSelector((state: RootState) => state.agreement.currentAgreement?.classificationLevel || ClassificationLevel.UNCLASSIFIED);

  // Local state

  const [localClassificationLevel, setLocalClassificationLevel] = useState<ClassificationLevel>(classificationLevel);
  const [localFirstParty, setLocalFirstParty] = useState('');
  const [localFirstPartyAcronym, setLocalFirstPartyAcronym] = useState('');
  const [localSecondParty, setLocalSecondParty] = useState('');
  const [localSecondPartyAcronym, setLocalSecondPartyAcronym] = useState('');
  const [localSubject, setLocalSubject] = useState('');
  const [localAgreementNumber, setLocalAgreementNumber] = useState('');

  // Change handlers
  const handleFirstPartyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalFirstParty(value);
    dispatch(setFirstParty(value));
  };

  const handleFirstPartyAcronymChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalFirstPartyAcronym(value);
    dispatch(setFirstPartyAcronym(value));
  };

  const handleSecondPartyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSecondParty(value);
    dispatch(setSecondParty(value));
  };

  const handleSecondPartyAcronymChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSecondPartyAcronym(value);
    dispatch(setSecondPartyAcronym(value));
  };

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSubject(value);
    dispatch(setSubject(value));
  };

  const handleAgreementNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalAgreementNumber(value);
    dispatch(setAgreementNumber(value));
  };

  const handleClassificationChange = (event: SelectChangeEvent<ClassificationLevel>) => {
    const level = event.target.value as ClassificationLevel;
    setLocalClassificationLevel(level);
    dispatch(updateClassification(localClassificationLevel))
  };

  const handleNext = () => {
    dispatch(setCurrentStep(3));
  };


  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <LinearProgress
        variant="determinate"
        value={40}
        sx={{ mb: 3, height: 10, bgcolor: '#eeeeee' }}
      />
      <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>
        Basic Information
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: '#eeeeee', pb: 1, mb: 3 }} />

      <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
        Enter the basic information for this agreement.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Party"
            value={localFirstParty}
            onChange={handleFirstPartyChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Party Acronym"
            value={localFirstPartyAcronym}
            onChange={handleFirstPartyAcronymChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Second Party"
            value={localSecondParty}
            onChange={handleSecondPartyChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Second Party Acronym"
            value={localSecondPartyAcronym}
            onChange={handleSecondPartyAcronymChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Subject"
            value={localSubject}
            onChange={handleSubjectChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Agreement Number"
            value={localAgreementNumber}
            onChange={handleAgreementNumberChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="classification-level-label">Classification Level</InputLabel>
            <Select
              labelId="classification-level-label"
              id="classification-level-select"
              value={localClassificationLevel}
              label="Classification Level"
              onChange={handleClassificationChange}
            >
              <MenuItem value={ClassificationLevel.UNCLASSIFIED}>Unclassified</MenuItem>
              <MenuItem value={ClassificationLevel.CONFIDENTIAL}>Confidential</MenuItem>
              <MenuItem value={ClassificationLevel.SECRET}>Secret</MenuItem>
              <MenuItem value={ClassificationLevel.TOP_SECRET}>Top Secret</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }} />
      <WizardNavigation
        nextDisabled={!localClassificationLevel}
        onNext={handleNext}
      />
    </Box>
  );
};

export default BasicInformationStep;