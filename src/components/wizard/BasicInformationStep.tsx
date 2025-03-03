// src/components/wizard/BasicInformationStep.tsx
import React, { useState } from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Grid, LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateAgreementTitle, updateClassification } from '../../store/slices/agreementSlice';
import { ClassificationLevel } from '../../types/types'; // Import ClassificationLevel
import { RootState } from '../../store/store';
import WizardNavigation from './WizardNavigation';

const BasicInformationStep: React.FC = () => {
    const dispatch = useDispatch();
    const agreementTitle = useSelector((state: RootState) => state.agreement.currentAgreement?.title || '');
    const classificationLevel = useSelector((state: RootState) => state.agreement.currentAgreement?.classificationLevel || ClassificationLevel.UNCLASSIFIED);

    const [localAgreementTitle, setLocalAgreementTitle] = useState(agreementTitle);
    const [localClassificationLevel, setLocalClassificationLevel] = useState<ClassificationLevel>(classificationLevel);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalAgreementTitle(event.target.value);
    };

    const handleClassificationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const level = event.target.value as ClassificationLevel;
        setLocalClassificationLevel(level);
    };

    const handleNext = () => {
        // Dispatch actions to update the Redux store
        dispatch(updateAgreementTitle(localAgreementTitle));
        dispatch(updateClassification(localClassificationLevel));
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
            <Grid item xs={12}>
              <TextField
                  fullWidth
                  label="Agreement Title"
                  value={localAgreementTitle}
                  onChange={handleTitleChange}
                  variant="outlined"
                  required
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
                nextDisabled={!localAgreementTitle || !localClassificationLevel} // Disable next if no title or classification
                onNext={handleNext}
            />
        </Box>
    );
};

export default BasicInformationStep;
