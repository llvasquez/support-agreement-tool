import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgreementType, WizardState } from '../types/types';

const initialState: WizardState = {
  currentStep: 1,
  agreementType: AgreementType.UNKNOWN,
  determiningFactors: {
    involvesResources: false,
    involvesReimbursement: false,
    involvesFunding: false,
    partiesAllDoD: true,
    documentingUnderstanding: false,
  },
  currentAgreement: null
};

const agreementSlice = createSlice({
  name: 'agreement',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setAgreementType: (state, action: PayloadAction<AgreementType>) => {
      state.agreementType = action.payload;
    },
    setDeterminingFactor: (
      state,
      action: PayloadAction<{ factor: keyof WizardState['determiningFactors']; value: boolean }>
    ) => {
      const { factor, value } = action.payload;
      state.determiningFactors[factor] = value;
    },
    determineAgreementType: (state) => {
      const { partiesAllDoD, involvesResources, involvesReimbursement, involvesFunding, documentingUnderstanding } = state.determiningFactors;
      
      if (!partiesAllDoD) {
        state.agreementType = AgreementType.OTHER;
        return;
      }
      
      if (involvesResources || involvesReimbursement || involvesFunding) {
        state.agreementType = AgreementType.MOA;
        return;
      }
      
      if (documentingUnderstanding) {
        state.agreementType = AgreementType.MOU;
        return;
      }
      
      state.agreementType = AgreementType.UNKNOWN;
    },
    resetWizard: (state) => {
      state.currentStep = 1;
      state.agreementType = AgreementType.UNKNOWN;
      state.determiningFactors = initialState.determiningFactors;
    },
  },
});

export const {
  setCurrentStep,
  setAgreementType,
  setDeterminingFactor,
  determineAgreementType,
  resetWizard,
} = agreementSlice.actions;

export default agreementSlice.reducer;