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
    LinearProgress,
    Tabs,
    Tab,
    SelectChangeEvent
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, SmartToy as SmartToyIcon, Edit as EditIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateSection,
    addSection,
    removeSection
} from '../../store/slices/agreementSlice';
import { setCurrentStep } from '../../store/slices/wizardSlice';
import { ClassificationLevel } from '../../types/types';
import { RootState } from '../../store/store';
import WizardNavigation from './WizardNavigation';
import AIAssistant from '../ai/AIAssistant';

// Interface for tab panel props
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// Tab Panel component
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`agreement-tabpanel-${index}`}
            aria-labelledby={`agreement-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const AgreementDetailsStep: React.FC = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state: RootState) => state.agreement.currentAgreement?.sections || []);
    const author = useSelector((state: RootState) => state.agreement.currentAgreement?.lastModifiedBy || '');
    const [newSectionName, setNewSectionName] = useState('');
    const [newSectionContent, setNewSectionContent] = useState('');
    const [newClassificationMarking, setNewClassificationMarking] = useState<string>('U'); // Default to Unclassified

    // State for tabs
    const [tabValue, setTabValue] = useState(0);

    const handleSectionContentChange = (sectionId: string, newContent: string) => {
        dispatch(updateSection({
            sectionId,
            content: newContent,
            classificationMarking: sections.find(s => s.id === sectionId)?.classificationMarking || 'U'
        }));
    };

    const handleClassificationChange = (sectionId: string, newValue: string) => {
        const section = sections.find(s => s.id === sectionId);
        if (section) {
            dispatch(updateSection({
                sectionId,
                content: section.content,
                classificationMarking: newValue
            }));
        }
    };

    const handleAddSection = () => {
        if (newSectionName.trim()) {
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

    // Handle tab change
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
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
                Review and edit the agreement sections below. You can add custom sections as needed or use the AI Assistant to generate content.
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="agreement details tabs">
                    <Tab icon={<EditIcon />} label="Manual Edit" id="agreement-tab-0" aria-controls="agreement-tabpanel-0" />
                    <Tab icon={<SmartToyIcon />} label="AI Assistant" id="agreement-tab-1" aria-controls="agreement-tabpanel-1" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <List sx={{ width: '100%', bgcolor: 'background.paper', mb: 3, flexGrow: 1, overflow: 'auto' }}>
                    {sections.map((section, index) => (
                        <React.Fragment key={section.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" component="div">
                                            {section.name}
                                            {section.isMandatory && (
                                                <Typography variant="caption" color="error" component="span" sx={{ ml: 1 }}>
                                                    (Required)
                                                </Typography>
                                            )}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box sx={{ mt: 1 }}>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                value={section.content}
                                                onChange={(e) => handleSectionContentChange(section.id, e.target.value)}
                                                disabled={false} // You can add logic to disable editing for certain sections
                                            />
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                <Typography variant="caption" color="text.secondary">
                                                    Last modified: {new Date(section.lastModifiedDate).toLocaleString()}
                                                </Typography>
                                                <FormControl size="small" sx={{ width: 150 }}>
                                                    <InputLabel id={`classification-label-${section.id}`}>Classification</InputLabel>
                                                    <Select
                                                        labelId={`classification-label-${section.id}`}
                                                        value={section.classificationMarking}
                                                        label="Classification"
                                                        onChange={(e) => handleClassificationChange(section.id, e.target.value)}
                                                    >
                                                        <MenuItem value="U">Unclassified</MenuItem>
                                                        <MenuItem value="C">Confidential</MenuItem>
                                                        <MenuItem value="S">Secret</MenuItem>
                                                        <MenuItem value="TS">Top Secret</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    }
                                />
                                {!section.isMandatory && (
                                    <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveSection(section.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                )}
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))}
                </List>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <TextField
                        label="Section Name"
                        value={newSectionName}
                        onChange={(e) => setNewSectionName(e.target.value)}
                        sx={{ mr: 2, flexGrow: 1 }}
                    />
                    <FormControl sx={{ width: 150, mr: 2 }}>
                        <InputLabel id="new-classification-label">Classification</InputLabel>
                        <Select
                            labelId="new-classification-label"
                            value={newClassificationMarking}
                            label="Classification"
                            onChange={(e) => setNewClassificationMarking(e.target.value)}
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

                <TextField
                    label="Section Content"
                    multiline
                    rows={4}
                    value={newSectionContent}
                    onChange={(e) => setNewSectionContent(e.target.value)}
                    fullWidth
                    sx={{ mb: 3 }}
                />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <AIAssistant />
            </TabPanel>

            <Box sx={{ flexGrow: 1 }} />
            <WizardNavigation
                onNext={() => dispatch(setCurrentStep(4))}
                onBack={() => dispatch(setCurrentStep(2))}
            />
        </Box>
    );
};

export default AgreementDetailsStep;
