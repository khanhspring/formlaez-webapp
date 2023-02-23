import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from './app/features/form-builder/slice';
import formGenerator from './app/features/form-generator/slice';

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    formGenerator: formGenerator
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch