import { configureStore } from '@reduxjs/toolkit';
import agreementReducer from './slices/agreementSlice';
import wizardReducer from './slices/wizardSlice'; // Import wizardReducer

export const store = configureStore({
  reducer: {
    agreement: agreementReducer,
    wizard: wizardReducer, // Add wizardReducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
