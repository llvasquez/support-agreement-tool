// src/components/DocumentEditor.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Chip
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import HistoryIcon from '@mui/icons-material/History';
import { SelectChangeEvent } from '@mui/material';
import { RootState } from '../store/store';
import { 
  addSection, 
  saveAgreement, 
  updateClassification 
} from '../store/slices/agreementSlice';
import SectionEditor from './SectionEditor';
// Import ClassificationLevel from types/types instead of types/agreements
import { ClassificationLevel } from '../types/types';
// Import Section from agreements
import { Section } from '../types/agreements';

const DocumentEditor: React.FC = () => {
  const dispatch = useDispatch();
  const { currentAgreement } = useSelector((state: RootState) => state.agreement);
  
  const [newSectionDialogOpen, setNewSectionDialogOpen] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [newSectionPortionMarking, setNewSectionPortionMarking] = useState('U');
  
  if (!currentAgreement) {
    return (
      <Container>
        <Typography variant="h5" sx={{ my: 4 }}>
          No agreement selected. Please create or load an agreement.
        </Typography>
      </Container>
    );
  }

  const handleClassificationChange = (event: SelectChangeEvent<string>) => {
    dispatch(updateClassification(event.target.value as ClassificationLevel));
  };

  const handleSaveAgreement = () => {
    dispatch(saveAgreement());
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: Date.now().toString(), // Ensure a unique ID
      title: newSectionTitle,
      content: newSectionContent,
      portionMarking: newSectionPortionMarking,
      isMandatory: false, // Default value, adjust if necessary
    };

    dispatch(addSection({
      name: newSection.name, // Correct property
      content: newSection.content,
      classificationMarking: newSection.classificationMarking,
  }));
  

    // Reset form and close dialog
    setNewSectionTitle('');
    setNewSectionContent('');
    setNewSectionPortionMarking('U');
    setNewSectionDialogOpen(false);
  };

  const getClassificationColor = (classification: ClassificationLevel): string => {
    switch (classification) {
      case ClassificationLevel.UNCLASSIFIED: return 'success.main';
      case ClassificationLevel.CONFIDENTIAL: return 'info.main';
      case ClassificationLevel.SECRET: return 'warning.main';
      case ClassificationLevel.TOP_SECRET: return 'error.main';
      default: return 'grey.500';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Classification Banner */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: getClassificationColor(currentAgreement.classificationLevel),
          color: 'white',
          mb: 2
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {currentAgreement.classificationLevel}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Document Toolbar */}
      <Paper sx={{ mb: 2, p: 1 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="classification-label">Classification</InputLabel>
              <Select
                labelId="classification-label"
                value={currentAgreement.classificationLevel}
                label="Classification"
                onChange={handleClassificationChange}
              >
                {Object.values(ClassificationLevel).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item sx={{ flexGrow: 1 }}>
            <Chip 
              label={`Version: ${currentAgreement.currentVersionId}`} 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label={`Type: ${currentAgreement.type}`} 
              color="primary" 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label={`Status: ${currentAgreement.status}`} 
              color="secondary" 
              size="small" 
            />
          </Grid>
          
          <Grid item>
            <IconButton color="primary" onClick={() => setNewSectionDialogOpen(true)}>
              <AddIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleSaveAgreement}>
              <SaveIcon />
            </IconButton>
            <IconButton color="primary">
              <PrintIcon />
            </IconButton>
            <IconButton color="primary">
              <DownloadIcon />
            </IconButton>
            <IconButton color="primary">
              <HistoryIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Document Header */}
      <Paper sx={{ mb: 4, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {currentAgreement.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Created: {new Date(currentAgreement.createdDate).toLocaleDateString()}
          {' | '}
          Last Modified: {new Date(currentAgreement.lastModifiedDate).toLocaleDateString()}
        </Typography>
      </Paper>

      {/* Document Sections */}
      <Container maxWidth="md">
      {currentAgreement.sections.map((section) => (
          <SectionEditor 
            key={section.id} 
            section={section}
            readOnly={currentAgreement.status === 'final'}
          />
        ))}
      </Container>

      {/* Classification Footer */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: getClassificationColor(currentAgreement.classificationLevel),
          color: 'white',
          mt: 2
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {currentAgreement.classificationLevel}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Add New Section Dialog */}
      <Dialog 
        open={newSectionDialogOpen} 
        onClose={() => setNewSectionDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Section</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Section Title"
            fullWidth
            variant="outlined"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="new-portion-marking-label">Portion Marking</InputLabel>
            <Select
              labelId="new-portion-marking-label"
              value={newSectionPortionMarking}
              label="Portion Marking"
              onChange={(e) => setNewSectionPortionMarking(e.target.value)}
            >
              {['U', 'C', 'S', 'TS'].map((marking) => (
                <MenuItem key={marking} value={marking}>
                  {marking}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            multiline
            rows={8}
            margin="dense"
            label="Section Content"
            fullWidth
            variant="outlined"
            value={newSectionContent}
            onChange={(e) => setNewSectionContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewSectionDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddSection} variant="contained" color="primary">
            Add Section
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DocumentEditor;