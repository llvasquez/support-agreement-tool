// src/store/slices/agreementSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Agreement, ClassificationLevel, Section, AgreementType } from '../../types/types'; // Corrected import path
import { getTemplateByType } from '../../data/agreementTemplates';


interface AgreementState {
  currentAgreement: Agreement | null;
  savedAgreements: Agreement[];
  loading: boolean;
  error: string | null;
}

const initialState: AgreementState = {
  currentAgreement: null,
  savedAgreements: [],
  loading: false,
  error: null,
};

const agreementSlice = createSlice({
  name: 'agreement',
  initialState,
  reducers: {
    // Create a new agreement from a template
    createAgreement: (state, action: PayloadAction<{
      type: AgreementType;
      title: string;
      classificationLevel: ClassificationLevel;
      author: string;
    }>) => {
      const { type, title, classificationLevel, author } = action.payload;
      const template = getTemplateByType(type);

      const now = new Date().toISOString();

      if(template){
        state.currentAgreement = {
          id: uuidv4(),
          type,
          title,
          sections: template.sections.map((section, index) => {
            return {
              ...section,
              id: uuidv4(),
              name: section.name,
              order: index,
              lastModifiedBy: author,
              lastModifiedDate: now, 
              agreementId: uuidv4(),
              versionId: '1.0.0',
              classificationMarking: 'U'
            };
          }),        
          classificationLevel,
          createdDate: now,
          lastModifiedDate: now,
          currentVersionId: '1.0.0',
          createdBy: author,
          lastModifiedBy: author,
          status: 'draft',
        };
      }
    },
    // Add new reducers to update the state
    updateAgreementTitle: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.title = action.payload;
      }
    },

    updateClassification: (state, action: PayloadAction<ClassificationLevel>) => {
      if (state.currentAgreement) {
        state.currentAgreement.classificationLevel = action.payload;
      }
    },
    // Update a section in the current agreement
    updateSection: (state, action: PayloadAction<{
      sectionId: string;
      content: string;
      classificationMarking: string; // Changed from portionMarking to classificationMarking
    }>) => {
      if (!state.currentAgreement) return;

      const { sectionId, content, classificationMarking } = action.payload;
      const sectionIndex = state.currentAgreement.sections.findIndex((s: Section) => s.id === sectionId);

      if (sectionIndex !== -1) {
        state.currentAgreement.sections[sectionIndex].content = content;
        state.currentAgreement.sections[sectionIndex].classificationMarking = classificationMarking; // Changed from portionMarking to classificationMarking
        state.currentAgreement.lastModifiedDate = new Date().toISOString();
      }
    },

    // Add a new custom section
    addSection: (state, action: PayloadAction<{
      name: string;
      content: string;
      classificationMarking: string; // Changed from portionMarking to classificationMarking
    }>) => {
      if (!state.currentAgreement) return;

      const { name, content, classificationMarking } = action.payload;
      const newSection: Section = {
        id: uuidv4(),
        agreementId: state.currentAgreement.id,
        versionId: state.currentAgreement.currentVersionId,
        name,
        content,
        isMandatory: false,
        classificationMarking, // Changed from portionMarking to classificationMarking
        lastModifiedBy: state.currentAgreement.lastModifiedBy,
        lastModifiedDate: new Date().toISOString(),
        order: state.currentAgreement.sections.length
      };
      state.currentAgreement.sections.push(newSection);

      state.currentAgreement.lastModifiedDate = new Date().toISOString();
    },

    // Remove a non-mandatory section
    removeSection: (state, action: PayloadAction<string>) => {
      if (!state.currentAgreement) return;

      const sectionId = action.payload;
      const sectionIndex = state.currentAgreement.sections.findIndex((s: Section) => s.id === sectionId);

      if (sectionIndex !== -1 && !state.currentAgreement.sections[sectionIndex].isMandatory) {
        state.currentAgreement.sections.splice(sectionIndex, 1);
        state.currentAgreement.lastModifiedDate = new Date().toISOString();
      }
    },

    // Save current agreement
    saveAgreement: (state) => {
      if (!state.currentAgreement) return;

      // Create a new version if this agreement already exists
      const existingIndex = state.savedAgreements.findIndex(a => a.id === state.currentAgreement?.id);

      if (existingIndex !== -1) {
        // Increment version number (assuming semantic versioning)
        const currentVersion = state.currentAgreement.currentVersionId;
        const versionParts = currentVersion.split('.');
        const newMinorVersion = parseInt(versionParts[2]) + 1;
        const newVersion = `${versionParts[0]}.${versionParts[1]}.${newMinorVersion}`;

        state.currentAgreement.currentVersionId = newVersion;
        state.savedAgreements[existingIndex] = { ...state.currentAgreement };
      } else {
        state.savedAgreements.push({ ...state.currentAgreement });
      }
    },

    // Load an existing agreement
    loadAgreement: (state, action: PayloadAction<string>) => {
      const agreementId = action.payload;
      const agreement = state.savedAgreements.find(a => a.id === agreementId);

      if (agreement) {
        state.currentAgreement = { ...agreement };
      }
    },

    // Clear current agreement
    clearCurrentAgreement: (state) => {
      state.currentAgreement = null;
    },
  },
});

export const {
  createAgreement,
  updateSection,
  addSection,
  removeSection,
  saveAgreement,
  loadAgreement,
  updateClassification,
  clearCurrentAgreement,
  updateAgreementTitle,
} = agreementSlice.actions;

export default agreementSlice.reducer;
