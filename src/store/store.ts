// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import agreementReducer from './slices/agreementSlice';
import wizardReducer from './slices/wizardSlice';

const rootReducer = combineReducers({
  agreement: agreementReducer,
  wizard: wizardReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Selectors
export const selectFirstParty = (state: RootState) => state.agreement.currentAgreement?.firstParty;
export const selectFirstPartyAcronym = (state: RootState) => state.agreement.currentAgreement?.firstPartyAcronym;
export const selectSecondParty = (state: RootState) => state.agreement.currentAgreement?.secondParty;
export const selectSecondPartyAcronym = (state: RootState) => state.agreement.currentAgreement?.secondPartyAcronym;
export const selectSubject = (state: RootState) => state.agreement.currentAgreement?.subject;
export const selectAgreementNumber = (state: RootState) => state.agreement.currentAgreement?.agreementNumber;

