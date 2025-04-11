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
  setFirstPartyAddress,
  setSecondParty,
  setSecondPartyAcronym,
  setSecondPartyAddress,
  setSubject,
  setAgreementNumber,
  updateClassification,
  setFirstPartyPOC,
  setSecondPartyPOC,
  setFirstPartyAlternatePOC,
  setSecondPartyAlternatePOC
} from '../../store/slices/agreementSlice';
import { ClassificationLevel } from '../../types/types';
import { RootState } from '../../store/store';
import WizardNavigation from './WizardNavigation';
import { setCurrentStep } from '../../store/slices/wizardSlice';

const BasicInformationStep: React.FC = () => {
  const dispatch = useDispatch();

  // Selectors
  const currentAgreement = useSelector((state: RootState) => state.agreement.currentAgreement);
  const classificationLevel = currentAgreement?.classificationLevel || ClassificationLevel.UNCLASSIFIED;

  // Local state
  const [localClassificationLevel, setLocalClassificationLevel] = useState<ClassificationLevel>(classificationLevel);
  const [localFirstParty, setLocalFirstParty] = useState(currentAgreement?.firstParty || '');
  const [localFirstPartyAcronym, setLocalFirstPartyAcronym] = useState(currentAgreement?.firstPartyAcronym || '');
  const [localFirstPartyAddress, setLocalFirstPartyAddress] = useState(currentAgreement?.firstPartyAddress || '');
  const [localSecondParty, setLocalSecondParty] = useState(currentAgreement?.secondParty || '');
  const [localSecondPartyAcronym, setLocalSecondPartyAcronym] = useState(currentAgreement?.secondPartyAcronym || '');
  const [localSecondPartyAddress, setLocalSecondPartyAddress] = useState(currentAgreement?.secondPartyAddress || '');
  const [localSubject, setLocalSubject] = useState(currentAgreement?.subject || '');
  const [localAgreementNumber, setLocalAgreementNumber] = useState(currentAgreement?.agreementNumber || '');

  // POC information
  const [localFirstPartyPOCName, setLocalFirstPartyPOCName] = useState(currentAgreement?.firstPartyPOC?.name || '');
  const [localFirstPartyPOCPosition, setLocalFirstPartyPOCPosition] = useState(currentAgreement?.firstPartyPOC?.position || '');
  const [localFirstPartyPOCOffice, setLocalFirstPartyPOCOffice] = useState(currentAgreement?.firstPartyPOC?.office || '');
  const [localFirstPartyPOCPhone, setLocalFirstPartyPOCPhone] = useState(currentAgreement?.firstPartyPOC?.phone || '');
  const [localFirstPartyPOCEmail, setLocalFirstPartyPOCEmail] = useState(currentAgreement?.firstPartyPOC?.email || '');

  const [localFirstPartyAlternatePOCName, setLocalFirstPartyAlternatePOCName] = useState(currentAgreement?.firstPartyAlternatePOC?.name || '');
  const [localFirstPartyAlternatePOCPosition, setLocalFirstPartyAlternatePOCPosition] = useState(currentAgreement?.firstPartyAlternatePOC?.position || '');
  const [localFirstPartyAlternatePOCOffice, setLocalFirstPartyAlternatePOCOffice] = useState(currentAgreement?.firstPartyAlternatePOC?.office || '');
  const [localFirstPartyAlternatePOCPhone, setLocalFirstPartyAlternatePOCPhone] = useState(currentAgreement?.firstPartyAlternatePOC?.phone || '');
  const [localFirstPartyAlternatePOCEmail, setLocalFirstPartyAlternatePOCEmail] = useState(currentAgreement?.firstPartyAlternatePOC?.email || '');

  const [localSecondPartyPOCName, setLocalSecondPartyPOCName] = useState(currentAgreement?.secondPartyPOC?.name || '');
  const [localSecondPartyPOCPosition, setLocalSecondPartyPOCPosition] = useState(currentAgreement?.secondPartyPOC?.position || '');
  const [localSecondPartyPOCOffice, setLocalSecondPartyPOCOffice] = useState(currentAgreement?.secondPartyPOC?.office || '');
  const [localSecondPartyPOCPhone, setLocalSecondPartyPOCPhone] = useState(currentAgreement?.secondPartyPOC?.phone || '');
  const [localSecondPartyPOCEmail, setLocalSecondPartyPOCEmail] = useState(currentAgreement?.secondPartyPOC?.email || '');

  const [localSecondPartyAlternatePOCName, setLocalSecondPartyAlternatePOCName] = useState(currentAgreement?.secondPartyAlternatePOC?.name || '');
  const [localSecondPartyAlternatePOCPosition, setLocalSecondPartyAlternatePOCPosition] = useState(currentAgreement?.secondPartyAlternatePOC?.position || '');
  const [localSecondPartyAlternatePOCOffice, setLocalSecondPartyAlternatePOCOffice] = useState(currentAgreement?.secondPartyAlternatePOC?.office || '');
  const [localSecondPartyAlternatePOCPhone, setLocalSecondPartyAlternatePOCPhone] = useState(currentAgreement?.secondPartyAlternatePOC?.phone || '');
  const [localSecondPartyAlternatePOCEmail, setLocalSecondPartyAlternatePOCEmail] = useState(currentAgreement?.secondPartyAlternatePOC?.email || '');

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

  const handleFirstPartyAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalFirstPartyAddress(value);
    dispatch(setFirstPartyAddress(value));
  };

  const handleSecondPartyAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalSecondPartyAddress(value);
    dispatch(setSecondPartyAddress(value));
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

  const handleClassificationChange = (event: SelectChangeEvent) => {
    const value = event.target.value as ClassificationLevel;
    setLocalClassificationLevel(value);
    dispatch(updateClassification(value));
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
            label="First Party Mailing Address"
            value={localFirstPartyAddress}
            onChange={handleFirstPartyAddressChange}
            variant="outlined"
            multiline
            rows={3}
            placeholder="Enter complete mailing address"
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
            label="Second Party Mailing Address"
            value={localSecondPartyAddress}
            onChange={handleSecondPartyAddressChange}
            variant="outlined"
            multiline
            rows={3}
            placeholder="Enter complete mailing address"
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
            <InputLabel id="classification-label">Classification Level</InputLabel>
            <Select
              labelId="classification-label"
              id="classification"
              value={localClassificationLevel}
              label="Classification Level"
              onChange={handleClassificationChange}
            >
              <MenuItem value={ClassificationLevel.UNCLASSIFIED}>Unclassified</MenuItem>
              <MenuItem value={ClassificationLevel.CONFIDENTIAL}>CUI</MenuItem>
              <MenuItem value={ClassificationLevel.SECRET}>Secret</MenuItem>
              <MenuItem value={ClassificationLevel.TOP_SECRET}>Top Secret</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* First Party Primary POC */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
          First Party Primary Point of Contact
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={localFirstPartyPOCName}
              onChange={(e) => {
                setLocalFirstPartyPOCName(e.target.value);
                dispatch(setFirstPartyPOC({ name: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Position"
              value={localFirstPartyPOCPosition}
              onChange={(e) => {
                setLocalFirstPartyPOCPosition(e.target.value);
                dispatch(setFirstPartyPOC({ position: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Office Identification"
              value={localFirstPartyPOCOffice}
              onChange={(e) => {
                setLocalFirstPartyPOCOffice(e.target.value);
                dispatch(setFirstPartyPOC({ office: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={localFirstPartyPOCPhone}
              onChange={(e) => {
                setLocalFirstPartyPOCPhone(e.target.value);
                dispatch(setFirstPartyPOC({ phone: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              value={localFirstPartyPOCEmail}
              onChange={(e) => {
                setLocalFirstPartyPOCEmail(e.target.value);
                dispatch(setFirstPartyPOC({ email: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>

      {/* First Party Alternate POC */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
          First Party Alternate Point of Contact
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={localFirstPartyAlternatePOCName}
              onChange={(e) => {
                setLocalFirstPartyAlternatePOCName(e.target.value);
                dispatch(setFirstPartyAlternatePOC({ name: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Position"
              value={localFirstPartyAlternatePOCPosition}
              onChange={(e) => {
                setLocalFirstPartyAlternatePOCPosition(e.target.value);
                dispatch(setFirstPartyAlternatePOC({ position: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Office Identification"
              value={localFirstPartyAlternatePOCOffice}
              onChange={(e) => {
                setLocalFirstPartyAlternatePOCOffice(e.target.value);
                dispatch(setFirstPartyAlternatePOC({ office: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={localFirstPartyAlternatePOCPhone}
              onChange={(e) => {
                setLocalFirstPartyAlternatePOCPhone(e.target.value);
                dispatch(setFirstPartyAlternatePOC({ phone: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              value={localFirstPartyAlternatePOCEmail}
              onChange={(e) => {
                setLocalFirstPartyAlternatePOCEmail(e.target.value);
                dispatch(setFirstPartyAlternatePOC({ email: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Second Party Primary POC */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
          Second Party Primary Point of Contact
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={localSecondPartyPOCName}
              onChange={(e) => {
                setLocalSecondPartyPOCName(e.target.value);
                dispatch(setSecondPartyPOC({ name: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Position"
              value={localSecondPartyPOCPosition}
              onChange={(e) => {
                setLocalSecondPartyPOCPosition(e.target.value);
                dispatch(setSecondPartyPOC({ position: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Office Identification"
              value={localSecondPartyPOCOffice}
              onChange={(e) => {
                setLocalSecondPartyPOCOffice(e.target.value);
                dispatch(setSecondPartyPOC({ office: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={localSecondPartyPOCPhone}
              onChange={(e) => {
                setLocalSecondPartyPOCPhone(e.target.value);
                dispatch(setSecondPartyPOC({ phone: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              value={localSecondPartyPOCEmail}
              onChange={(e) => {
                setLocalSecondPartyPOCEmail(e.target.value);
                dispatch(setSecondPartyPOC({ email: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Second Party Alternate POC */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.primary" sx={{ mb: 2 }}>
          Second Party Alternate Point of Contact
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={localSecondPartyAlternatePOCName}
              onChange={(e) => {
                setLocalSecondPartyAlternatePOCName(e.target.value);
                dispatch(setSecondPartyAlternatePOC({ name: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Position"
              value={localSecondPartyAlternatePOCPosition}
              onChange={(e) => {
                setLocalSecondPartyAlternatePOCPosition(e.target.value);
                dispatch(setSecondPartyAlternatePOC({ position: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Office Identification"
              value={localSecondPartyAlternatePOCOffice}
              onChange={(e) => {
                setLocalSecondPartyAlternatePOCOffice(e.target.value);
                dispatch(setSecondPartyAlternatePOC({ office: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={localSecondPartyAlternatePOCPhone}
              onChange={(e) => {
                setLocalSecondPartyAlternatePOCPhone(e.target.value);
                dispatch(setSecondPartyAlternatePOC({ phone: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email Address"
              value={localSecondPartyAlternatePOCEmail}
              onChange={(e) => {
                setLocalSecondPartyAlternatePOCEmail(e.target.value);
                dispatch(setSecondPartyAlternatePOC({ email: e.target.value }));
              }}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <WizardNavigation
        nextDisabled={!localClassificationLevel}
        onNext={handleNext}
      />
    </Box>
  );
};

export default BasicInformationStep;
