import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

interface FormGeneratorState {
  values?: any;
}

const initialState: FormGeneratorState = {};

export const formGeneratorSlice = createSlice({
  name: "formGenerator",
  initialState,
  reducers: {
    updateValues: (state, action: PayloadAction<any>) => {
      state.values = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { resetState, updateValues } = formGeneratorSlice.actions;

export const selectValues = (state: RootState) => state.formGenerator.values;

export default formGeneratorSlice.reducer;
