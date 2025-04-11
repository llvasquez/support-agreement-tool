// src/store/slices/agreementSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Agreement, ClassificationLevel, Section, AgreementType } from '../../types/types';
import { getTemplateByType } from '../../data/agreementTemplates';
import { AIService } from '../../services/AIService';

interface AgreementState {
  currentAgreement: Agreement | null;
  savedAgreements: Agreement[];
  loading: boolean;
  error: string | null;
}

// Helper function to update the Correspondence section content
const updateCorrespondenceSection = (state: AgreementState) => {
  if (!state.currentAgreement) return;

  const correspondenceSectionIndex = state.currentAgreement.sections.findIndex(
    section => section.name === 'Correspondence'
  );

  if (correspondenceSectionIndex !== -1) {
    const firstPartyAcronym = state.currentAgreement.firstPartyAcronym || '[First Party]';
    const secondPartyAcronym = state.currentAgreement.secondPartyAcronym || '[Second Party]';
    const firstPartyAddress = state.currentAgreement.firstPartyAddress || '[First Party Address]';
    const secondPartyAddress = state.currentAgreement.secondPartyAddress || '[Second Party Address]';

    let content = `All correspondence pertaining to this agreement shall be addressed as follows:\n\n`;
    content += `a. For the ${firstPartyAcronym}:\n${firstPartyAddress}\n\n`;
    content += `b. For the ${secondPartyAcronym}:\n${secondPartyAddress}\n`;

    // Update the section content
    state.currentAgreement.sections[correspondenceSectionIndex].content = content;
    state.currentAgreement.sections[correspondenceSectionIndex].lastModifiedDate = new Date().toISOString();
  }
};

// Helper function to update the POC section content
const updatePOCSection = (state: AgreementState) => {
  if (!state.currentAgreement) return;

  const pocSectionIndex = state.currentAgreement.sections.findIndex(
    section => section.name === 'Points of Contact (POCs)'
  );

  if (pocSectionIndex !== -1) {
    const firstPartyPOC = state.currentAgreement.firstPartyPOC;
    const secondPartyPOC = state.currentAgreement.secondPartyPOC;
    const firstPartyAcronym = state.currentAgreement.firstPartyAcronym || '[First Party]';
    const secondPartyAcronym = state.currentAgreement.secondPartyAcronym || '[Second Party]';

    let content = `The following POCs will be used by the Parties to communicate matters concerning this agreement. Each party may change its POC upon reasonable notice to the other party.\n`;

    // Add first party POC info
    content += `a. For the ${firstPartyAcronym}\n`;
    if (firstPartyPOC && firstPartyPOC.name) {
      content += `  1. ${firstPartyPOC.name}`;
      if (firstPartyPOC.position) content += `, ${firstPartyPOC.position}`;
      if (firstPartyPOC.office) content += `, ${firstPartyPOC.office}`;
      if (firstPartyPOC.phone) content += `, ${firstPartyPOC.phone}`;
      if (firstPartyPOC.email) content += `, ${firstPartyPOC.email}`;
      content += '\n';
    } else {
      content += `  1. [Name, position, office identification, phone number and email of primary POC]\n`;
    }

    // Add first party alternate POC info
    const firstPartyAlternatePOC = state.currentAgreement.firstPartyAlternatePOC;
    if (firstPartyAlternatePOC && firstPartyAlternatePOC.name) {
      content += `  2. ${firstPartyAlternatePOC.name}`;
      if (firstPartyAlternatePOC.position) content += `, ${firstPartyAlternatePOC.position}`;
      if (firstPartyAlternatePOC.office) content += `, ${firstPartyAlternatePOC.office}`;
      if (firstPartyAlternatePOC.phone) content += `, ${firstPartyAlternatePOC.phone}`;
      if (firstPartyAlternatePOC.email) content += `, ${firstPartyAlternatePOC.email}`;
      content += '\n';
    } else {
      content += `  2. [Name, position, office identification, phone number and email of alternate POC]\n`;
    }
    content += '\n';

    // Add second party POC info
    content += `b. For the ${secondPartyAcronym}\n`;
    if (secondPartyPOC && secondPartyPOC.name) {
      content += `  1. ${secondPartyPOC.name}`;
      if (secondPartyPOC.position) content += `, ${secondPartyPOC.position}`;
      if (secondPartyPOC.office) content += `, ${secondPartyPOC.office}`;
      if (secondPartyPOC.phone) content += `, ${secondPartyPOC.phone}`;
      if (secondPartyPOC.email) content += `, ${secondPartyPOC.email}`;
      content += '\n';
    } else {
      content += `  1. [Name, position, office identification, phone number and email of primary POC]\n`;
    }

    // Add second party alternate POC info
    const secondPartyAlternatePOC = state.currentAgreement.secondPartyAlternatePOC;
    if (secondPartyAlternatePOC && secondPartyAlternatePOC.name) {
      content += `  2. ${secondPartyAlternatePOC.name}`;
      if (secondPartyAlternatePOC.position) content += `, ${secondPartyAlternatePOC.position}`;
      if (secondPartyAlternatePOC.office) content += `, ${secondPartyAlternatePOC.office}`;
      if (secondPartyAlternatePOC.phone) content += `, ${secondPartyAlternatePOC.phone}`;
      if (secondPartyAlternatePOC.email) content += `, ${secondPartyAlternatePOC.email}`;
      content += '\n';
    } else {
      content += `  2. [Name, position, office identification, phone number and email of alternate POC]\n`;
    }

    // Update the section content
    state.currentAgreement.sections[pocSectionIndex].content = content;
    state.currentAgreement.sections[pocSectionIndex].lastModifiedDate = new Date().toISOString();
  }
};

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
    setFirstParty: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.firstParty = action.payload;
      }
    },
    setFirstPartyAcronym: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.firstPartyAcronym = action.payload;

        // Update all section contents to replace [First Party] with the new acronym
        if (action.payload && state.currentAgreement.sections) {
          state.currentAgreement.sections.forEach(section => {
            section.content = section.content.replace(/\[First Party\]/g, action.payload);
          });
        }
      }
    },
    setSecondParty: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.secondParty = action.payload;
      }
    },
    setSecondPartyAcronym: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.secondPartyAcronym = action.payload;

        // Update all section contents to replace [Second Party] with the new acronym
        if (action.payload && state.currentAgreement.sections) {
          state.currentAgreement.sections.forEach(section => {
            section.content = section.content.replace(/\[Second Party\]/g, action.payload);
          });
        }
      }
    },
    setFirstPartyAddress: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.firstPartyAddress = action.payload;

        // Update correspondence section if it exists
        updateCorrespondenceSection(state);
      }
    },
    setSecondPartyAddress: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.secondPartyAddress = action.payload;

        // Update correspondence section if it exists
        updateCorrespondenceSection(state);
      }
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.displayName = action.payload;
      }
    },
    setSubject: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.subject = action.payload;
      }
    },
    setAgreementNumber: (state, action: PayloadAction<string>) => {
      if (state.currentAgreement) {
        state.currentAgreement.agreementNumber = action.payload;
      }
    },
    // Create a new agreement from a template
    createAgreement: (state, action: PayloadAction<{
      type: AgreementType;
      classificationLevel: ClassificationLevel;
      author: string;
    }>) => {
      const { type, classificationLevel, author } = action.payload;
      const template = getTemplateByType(type);

      const now = new Date().toISOString();

      if (template) {
        state.currentAgreement = {
          id: uuidv4(),
          type,
          title: `${type}`,
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
          firstParty: '',  //Initialize
          firstPartyAcronym: '', //Initialize
          firstPartyAddress: '', //Initialize
          secondParty: '', //Initialize
          secondPartyAcronym: '', //Initialize
          secondPartyAddress: '', //Initialize
          subject: '', //Initialize
          agreementNumber: '', //Initialize
          displayName: '', //Initialize
          firstPartyPOC: {
            name: '',
            position: '',
            office: '',
            phone: '',
            email: ''
          },
          secondPartyPOC: {
            name: '',
            position: '',
            office: '',
            phone: '',
            email: ''
          },
          firstPartyAlternatePOC: {
            name: '',
            position: '',
            office: '',
            phone: '',
            email: ''
          },
          secondPartyAlternatePOC: {
            name: '',
            position: '',
            office: '',
            phone: '',
            email: ''
          }
        };
      }
    },
    // Add new reducers to update the state
    updateClassification: (state, action: PayloadAction<ClassificationLevel>) => {
      if (state.currentAgreement) {
        state.currentAgreement.classificationLevel = action.payload;
      }
    },

    // Update a section in the current agreement
    updateSection: (state, action: PayloadAction<{
      sectionId: string;
      content: string;
      classificationMarking: string;
    }>) => {
      if (!state.currentAgreement) return;

      const { sectionId, content, classificationMarking } = action.payload;
      const sectionIndex = state.currentAgreement.sections.findIndex((s: Section) => s.id === sectionId);

      if (sectionIndex !== -1) {
        // Replace placeholders in content
        let processedContent = content;

        // Replace [First Party] with firstPartyAcronym if available
        if (state.currentAgreement.firstPartyAcronym) {
          processedContent = processedContent.replace(/\[First Party\]/g, state.currentAgreement.firstPartyAcronym);
        }

        // Replace [Second Party] with secondPartyAcronym if available
        if (state.currentAgreement.secondPartyAcronym) {
          processedContent = processedContent.replace(/\[Second Party\]/g, state.currentAgreement.secondPartyAcronym);
        }

        state.currentAgreement.sections[sectionIndex].content = processedContent;
        state.currentAgreement.sections[sectionIndex].classificationMarking = classificationMarking;
        state.currentAgreement.lastModifiedDate = new Date().toISOString();
      }
    },

    // Add a new custom section
    addSection: (state, action: PayloadAction<{
      name: string;
      content: string;
      classificationMarking: string;
    }>) => {
      if (!state.currentAgreement) return;

      const { name, content, classificationMarking } = action.payload;

      // Replace placeholders in content
      let processedContent = content;

      // Replace [First Party] with firstPartyAcronym if available
      if (state.currentAgreement.firstPartyAcronym) {
        processedContent = processedContent.replace(/\[First Party\]/g, state.currentAgreement.firstPartyAcronym);
      }

      // Replace [Second Party] with secondPartyAcronym if available
      if (state.currentAgreement.secondPartyAcronym) {
        processedContent = processedContent.replace(/\[Second Party\]/g, state.currentAgreement.secondPartyAcronym);
      }

      const newSection: Section = {
        id: uuidv4(),
        agreementId: state.currentAgreement.id,
        versionId: state.currentAgreement.currentVersionId,
        name,
        content: processedContent,
        isMandatory: false,
        classificationMarking,
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

    // Update agreement with AI-generated content
    updateAgreementWithAIContent: (state, action: PayloadAction<{ name: string; content: string }[]>) => {
      if (!state.currentAgreement) return;

      const generatedSections = action.payload;
      const updatedAgreement = AIService.applyGeneratedContent(state.currentAgreement, generatedSections);
      state.currentAgreement = updatedAgreement;
    },

    // Set first party POC
    setFirstPartyPOC: (state, action: PayloadAction<{
      name?: string;
      position?: string;
      office?: string;
      phone?: string;
      email?: string;
    }>) => {
      if (state.currentAgreement && state.currentAgreement.firstPartyPOC) {
        state.currentAgreement.firstPartyPOC = {
          ...state.currentAgreement.firstPartyPOC,
          ...action.payload
        };

        // Update POC section if it exists
        updatePOCSection(state);
      }
    },

    // Set second party POC
    setSecondPartyPOC: (state, action: PayloadAction<{
      name?: string;
      position?: string;
      office?: string;
      phone?: string;
      email?: string;
    }>) => {
      if (state.currentAgreement && state.currentAgreement.secondPartyPOC) {
        state.currentAgreement.secondPartyPOC = {
          ...state.currentAgreement.secondPartyPOC,
          ...action.payload
        };

        // Update POC section if it exists
        updatePOCSection(state);
      }
    },

    // Set first party alternate POC
    setFirstPartyAlternatePOC: (state, action: PayloadAction<{
      name?: string;
      position?: string;
      office?: string;
      phone?: string;
      email?: string;
    }>) => {
      if (state.currentAgreement && state.currentAgreement.firstPartyAlternatePOC) {
        state.currentAgreement.firstPartyAlternatePOC = {
          ...state.currentAgreement.firstPartyAlternatePOC,
          ...action.payload
        };

        // Update POC section if it exists
        updatePOCSection(state);
      }
    },

    // Set second party alternate POC
    setSecondPartyAlternatePOC: (state, action: PayloadAction<{
      name?: string;
      position?: string;
      office?: string;
      phone?: string;
      email?: string;
    }>) => {
      if (state.currentAgreement && state.currentAgreement.secondPartyAlternatePOC) {
        state.currentAgreement.secondPartyAlternatePOC = {
          ...state.currentAgreement.secondPartyAlternatePOC,
          ...action.payload
        };

        // Update POC section if it exists
        updatePOCSection(state);
      }
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
  setFirstParty,
  setFirstPartyAcronym,
  setFirstPartyAddress,
  setSecondParty,
  setSecondPartyAcronym,
  setSecondPartyAddress,
  setDisplayName,
  setSubject,
  setAgreementNumber,
  updateAgreementWithAIContent,
  setFirstPartyPOC,
  setSecondPartyPOC,
  setFirstPartyAlternatePOC,
  setSecondPartyAlternatePOC
} = agreementSlice.actions;

export default agreementSlice.reducer;
