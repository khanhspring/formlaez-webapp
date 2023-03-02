import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from './app/features/form-builder/slice';
import formGenerator from './app/features/form-generator/slice';
import auth from './app/slices/auth';

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    formGenerator: formGenerator,
    auth: auth
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch