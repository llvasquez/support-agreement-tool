// src/components/SectionEditor.tsx
import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Paper, 
  Button, 
  Select, 
  MenuItem, 
  FormControl,
  InputLabel,
  Grid,
  Chip,
  SelectChangeEvent
} from '@mui/material';
import { Section } from '../types/agreements';
import { useDispatch } from 'react-redux';
import { updateSection } from '../store/slices/agreementSlice';

interface SectionEditorProps {
  section: Section;
  readOnly?: boolean;
}

const portionMarkings = ['U', 'C', 'S', 'TS'];

export const SectionEditor: React.FC<SectionEditorProps> = ({ 
  section,
  readOnly = false,
}) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(section.content);
  const [portionMarking, setPortionMarking] = useState(section.portionMarking);
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handlePortionMarkingChange = (event: SelectChangeEvent<string>) => {
    setPortionMarking(event.target.value);
  };

  const handleSave = () => {
    dispatch(updateSection({
      sectionId: section.id,
      content,
      classificationMarking,
    }));
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(section.content);
    setPortionMarking(section.portionMarking);
    setIsEditing(false);
  };

  const getPortionMarkingColor = (marking: string) => {
    switch (marking) {
      case 'U': return 'success';
      case 'C': return 'info';
      case 'S': return 'warning';
      case 'TS': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h6">{section.title}</Typography>
        </Grid>
        <Grid item>
          <Chip 
            label={portionMarking} 
            color={getPortionMarkingColor(portionMarking) as any}
            size="small"
          />
        </Grid>
        <Grid item>
          {section.isMandatory && (
            <Chip label="Mandatory" size="small" color="primary" />
          )}
        </Grid>
        <Grid item sx={{ flexGrow: 1 }} />
        {!readOnly && !isEditing && (
          <Grid item>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </Grid>
        )}
      </Grid>

      {isEditing ? (
        <Box>
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="portion-marking-label">Portion Marking</InputLabel>
            <Select
              labelId="portion-marking-label"
              value={portionMarking}
              label="Portion Marking"
              onChange={handlePortionMarkingChange}
            >
              {portionMarkings.map((marking) => (
                <MenuItem key={marking} value={marking}>
                  {marking}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={content}
            onChange={handleContentChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography 
          component="pre" 
          sx={{ 
            whiteSpace: 'pre-wrap',
            fontFamily: 'inherit',
            backgroundColor: 'background.paper',
            p: 2,
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          {content}
        </Typography>
      )}
    </Paper>
  );
};

export default SectionEditor;
