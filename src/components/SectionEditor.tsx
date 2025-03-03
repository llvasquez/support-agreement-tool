// src/components/SectionEditor.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Section } from '../types/types';
import { updateSection } from '../store/slices/agreementSlice';
import { 
    Box, 
    Typography, 
    Grid, 
    Chip, 
    TextField,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel
  } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { SelectChangeEvent } from '@mui/material';

interface SectionEditorProps {
  section: Section;
  readOnly: boolean;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ section, readOnly }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(section.content);
  const [classificationMarking, setClassificationMarking] = useState(section.classificationMarking);
  const [isEditing, setIsEditing] = useState(false);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleClassificationChange = (event: SelectChangeEvent) => {
    setClassificationMarking(event.target.value as string)
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
    setClassificationMarking(section.classificationMarking);
    setIsEditing(false);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <Typography variant="h6">{section.name}</Typography>
        </Grid>
        <Grid item>
          <Chip 
            label={`Marking: ${section.classificationMarking}`} 
            color="default" 
            size="small" 
            sx={{ mr: 1 }}
          />
        </Grid>
        {!readOnly && <Grid item>
          {!isEditing ? (
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={handleSave}>
                <CheckIcon />
              </IconButton>
              <IconButton onClick={handleCancel}>
                <CancelIcon />
              </IconButton>
            </>
          )}
        </Grid>}
      </Grid>

      {isEditing ? (
        <Box>
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel id="new-portion-marking-label">Classification Marking</InputLabel>
          <Select
            labelId="new-portion-marking-label"
            value={classificationMarking}
            label="Classification Marking"
            onChange={handleClassificationChange}
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
            fullWidth
            value={content}
            onChange={handleContentChange}
            rows={8}
            variant="outlined"
          />
        </Box>
      ) : (
        <Typography sx={{ whiteSpace: 'pre-line' }}>
          {content}
        </Typography>
      )}
    </Box>
  );
};

export default SectionEditor;
