// src/components/wizard/AgreementDetailsStep.tsx
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    IconButton,
    ListItemText,
    ListItemSecondaryAction,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    LinearProgress
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateSection,
    addSection,
    removeSection,
} from '../../store/slices/agreementSlice';
import { ClassificationLevel, Section } from '../../types/types';
import { RootState } from '../../store/store';
import WizardNavigation from './WizardNavigation';
import { SelectChangeEvent } from '@mui/material';

const AgreementDetailsStep: React.FC = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state: RootState) => state.agreement.currentAgreement?.sections || []);
    const author = useSelector((state: RootState) => state.agreement.currentAgreement?.lastModifiedBy || '');
    const [newSectionName, setNewSectionName] = useState('');
    const [newSectionContent, setNewSectionContent] = useState('');
    const [newClassificationMarking, setNewClassificationMarking] = useState<string>('U'); // Default to Unclassified

    const handleSectionContentChange = (sectionId: string, newContent: string) => {
      dispatch(updateSection({ sectionId, content: newContent, classificationMarking: getClassificationMarking(sectionId) }));
    };

    const getClassificationMarking = (sectionId: string): string => {
      const section = sections.find((s) => s.id === sectionId);
      return section ? section.classificationMarking : 'U';
    };

    const handleClassificationChange = (sectionId: string, event: SelectChangeEvent<string>) => {
      const newClassification = event.target.value;
      dispatch(updateSection({ sectionId, content: getContent(sectionId), classificationMarking: newClassification }));
    };

    const handleNewSectionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewSectionName(event.target.value);
    };

    const handleNewSectionContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewSectionContent(event.target.value);
    };

    const handleClassificationMarkingChange = (event: SelectChangeEvent<string>) => {
      setNewClassificationMarking(event.target.value);
    };

    const getContent = (sectionId: string): string => {
      const section = sections.find((s) => s.id === sectionId);
      return section ? section.content : '';
    };

    const handleAddSection = () => {
      if (newSectionName && newSectionContent) {
        dispatch(addSection({
            name: newSectionName,
            content: newSectionContent,
            classificationMarking: newClassificationMarking
        }));
        setNewSectionName('');
        setNewSectionContent('');
      }
    };

    const handleRemoveSection = (sectionId: string) => {
        dispatch(removeSection(sectionId));
    };

    return (
        <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <LinearProgress
                variant="determinate"
                value={60}
                sx={{ mb: 3, height: 10, bgcolor: '#eeeeee' }}
            />

            <Typography variant="h1" color="text.primary" sx={{ mb: 1 }}>
                Agreement Details
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: '#eeeeee', pb: 1, mb: 3 }} />

            <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
                Edit or add sections to your agreement.
            </Typography>

            <List>
                {sections.map((section, index) => (
                    <React.Fragment key={section.id}>
                        <ListItem>
                            <ListItemText
                                primary={
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="h6" sx={{ mr: 1 }}>{section.name}</Typography>
                                        <FormControl sx={{ minWidth: 120 }}>
                                            <InputLabel id={`classification-label-${section.id}`}>Classification</InputLabel>
                                            <Select
                                                labelId={`classification-label-${section.id}`}
                                                id={`classification-select-${section.id}`}
                                                value={getClassificationMarking(section.id)}
                                                label="Classification"
                                                onChange={(e) => handleClassificationChange(section.id, e)}
                                            >
                                                <MenuItem value="U">Unclassified</MenuItem>
                                                <MenuItem value="C">Confidential</MenuItem>
                                                <MenuItem value="S">Secret</MenuItem>
                                                <MenuItem value="TS">Top Secret</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                }
                                secondary={
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={getContent(section.id)}
                                        onChange={(e) => handleSectionContentChange(section.id, e.target.value)}
                                    />
                                }
                            />
                            {!section.isMandatory && (
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleRemoveSection(section.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>
                        {index < sections.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>

            <Typography variant="h6" color="text.primary" sx={{ mt: 3, mb: 1 }}>
                Add New Section
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                <TextField
                    label="Section Name"
                    variant="outlined"
                    value={newSectionName}
                    onChange={handleNewSectionNameChange}
                />
                <TextField
                    label="Section Content"
                    variant="outlined"
                    value={newSectionContent}
                    onChange={handleNewSectionContentChange}
                />
                 <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="new-classification-label">Classification</InputLabel>
                    <Select
                        labelId="new-classification-label"
                        id="new-classification-select"
                        value={newClassificationMarking}
                        label="Classification"
                        onChange={handleClassificationMarkingChange}
                    >
                        <MenuItem value="U">Unclassified</MenuItem>
                        <MenuItem value="C">Confidential</MenuItem>
                        <MenuItem value="S">Secret</MenuItem>
                        <MenuItem value="TS">Top Secret</MenuItem>
                    </Select>
                </FormControl>
                <IconButton color="primary" onClick={handleAddSection} aria-label="add section">
                    <AddIcon />
                </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            <WizardNavigation />
        </Box>
    );
};

export default AgreementDetailsStep;
