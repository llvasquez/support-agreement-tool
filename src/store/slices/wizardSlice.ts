// src/store/slices/wizardSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgreementType } from '../../types/types';

export interface WizardState {
  currentStep: number;
  agreementType: AgreementType;
  determiningFactors: {
    involvesResources: boolean;
    involvesReimbursement: boolean;
    involvesFunding: boolean;
    documentingUnderstanding: boolean;
    partiesAllDoD: boolean;
  };
}

const initialState: WizardState = {
  currentStep: 1,
  agreementType: AgreementType.UNKNOWN,
  determiningFactors: {
    involvesResources: false,
    involvesReimbursement: false,
    involvesFunding: false,
    documentingUnderstanding: false,
    partiesAllDoD: true,
  },
};

const wizardSlice = createSlice({
  name: 'wizard',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setDeterminingFactor: (
      state,
      action: PayloadAction<{ factor: keyof WizardState['determiningFactors']; value: boolean }>
    ) => {
      const { factor, value } = action.payload;
      state.determiningFactors[factor] = value;
    },
    determineAgreementType: (state) => {
      const {
        involvesResources,
        involvesReimbursement,
        involvesFunding,
        documentingUnderstanding,
        partiesAllDoD
      } = state.determiningFactors;

      if (!partiesAllDoD){
        state.agreementType = AgreementType.OTHER;
      } else if (involvesResources || involvesReimbursement || involvesFunding) {
        state.agreementType = AgreementType.MOA;
      } else if (documentingUnderstanding) {
        state.agreementType = AgreementType.MOU;
      } else {
        state.agreementType = AgreementType.UNKNOWN;
      }
    },
    resetWizard: (state) => {
      // Reset the wizard state to initial values
      state.currentStep = initialState.currentStep;
      state.agreementType = initialState.agreementType;
      state.determiningFactors = {
        ...initialState.determiningFactors
      };
    },
  },
});

export const { setCurrentStep, setDeterminingFactor, determineAgreementType, resetWizard } =
  wizardSlice.actions;

export default wizardSlice.reducer;
