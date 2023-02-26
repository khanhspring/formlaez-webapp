import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { toast } from "react-toastify";
import { RootState } from "../../../store";
import {
  ActionContext,
  AddFormField,
  AddFormSection,
  DuplicateFormField,
  DuplicateSection,
  Form,
  RemoveFormField,
  RemoveFormSection,
  ReorderFormField,
  ReorderFormSection,
  UpdateFormField,
  UpdateFormInfo,
  UpdateFormSection
} from "../../models/form";
import FormService from "../../services/form-service";
import FormUtil from "./utils/form-util";

export const loadForm = createAsyncThunk(
  "form/loadForm",
  async (formCode: string) => {
    return await FormService.findFormByCode(formCode);
  }
);

export const addSingleField = createAsyncThunk(
  "form/addSingleField",
  async (command: AddFormField, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.addSingleField(
      formBuilderState.form,
      command.field,
      command.sectionIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }

    const [formResult, newSection] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.addFormSection(newSection);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const addSection = createAsyncThunk(
  "form/addSection",
  async (command: AddFormSection, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.addSection(
      formBuilderState.form,
      command.section,
      command.sectionIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }

    const [formResult, newSection] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.addFormSection(newSection);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const addGroupField = createAsyncThunk(
  "form/addGroupField",
  async (command: AddFormField, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.addGroupField(
      formBuilderState.form,
      command.field,
      command.sectionIndex,
      command.fieldIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }

    const [formResult, newField] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.addGroupField(newField);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const reorderSection = createAsyncThunk(
  "form/reorderSection",
  async (command: ReorderFormSection, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.reorderSection(
      formBuilderState.form,
      command.fromIndex,
      command.toIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }

    thunkAPI.dispatch(updateForm(result));

    try {
      return await FormService.reorderSection(command);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const reorderField = createAsyncThunk(
  "form/reorderField",
  async (command: ReorderFormField, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.reorderField(
      formBuilderState.form,
      command.sectionCode,
      command.fromIndex,
      command.toIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }

    thunkAPI.dispatch(updateForm(result));

    try {
      return await FormService.reorderField(command);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const removeSection = createAsyncThunk(
  "form/removeSection",
  async (command: RemoveFormSection, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.removeSection(
      formBuilderState.form,
      command.sectionIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, removedSection] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.removeSection(removedSection.code);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const removeField = createAsyncThunk(
  "form/removeField",
  async (command: RemoveFormField, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.removeField(
      formBuilderState.form,
      command.sectionIndex,
      command.fieldIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, removedField] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.removeField(removedField.code);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const updateField = createAsyncThunk(
  "form/updateField",
  async (command: UpdateFormField, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      // thunkAPI.abort(); // TODO: error on click back
      return;
    }

    const result = FormUtil.updateField(
      formBuilderState.form,
      command.field,
      command.sectionIndex,
      command.fieldIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, updatedField] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.updateField(updatedField);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const updateSection = createAsyncThunk(
  "form/updateSection",
  async (command: UpdateFormSection, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.updateSection(
      formBuilderState.form,
      command.section,
      command.sectionIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, updatedSection] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.updateSection(updatedSection);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const duplicateSection = createAsyncThunk(
  "form/duplicateSection",
  async (command: DuplicateSection, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.duplicateSection(
      formBuilderState.form,
      command.sectionIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, newSection] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.addFormSection(newSection);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const duplicateField = createAsyncThunk(
  "form/duplicateField",
  async (command: DuplicateFormField, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.duplicateField(
      formBuilderState.form,
      command.sectionIndex,
      command.fieldIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, newField] = result;
    thunkAPI.dispatch(updateForm(formResult));

    try {
      return await FormService.addGroupField(newField);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const updateFormInfo = createAsyncThunk(
  "form/updateFormInfo",
  async (command: UpdateFormInfo, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const form = _.cloneDeep(formBuilderState?.form);
    form.title = command.title;
    form.description = command.description;
    form.coverType = command.coverType;
    form.coverColor = command.coverColor;
    form.coverImageUrl = command.coverImageUrl;

    thunkAPI.dispatch(updateForm(form));

    try {
      return await FormService.updateForm(form);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export interface FormBuilderState {
  form?: Form;
  currentItem?: ActionContext;
}

const initialState: FormBuilderState = {};

const showError = () => toast.error("Something went wrong. Please try again!");

export const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Form | undefined>) => {
      // console.log(JSON.stringify(action.payload));e
      state.form = _.cloneDeep(action.payload);
    },
    clearCurrentItem: (state, action: PayloadAction<undefined>) => {
      state.currentItem = undefined;
    },
    setCurrentItem: (state, action: PayloadAction<ActionContext>) => {
      state.currentItem = action.payload;
    },
    resetState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadForm.fulfilled, (state, action) => {
        state.form = action.payload;
      })
      .addCase(loadForm.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(addSingleField.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(addGroupField.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(addSection.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(reorderField.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(reorderSection.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(removeSection.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(removeField.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(updateField.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(updateSection.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(duplicateSection.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(duplicateField.rejected, (state, action) => {
        console.log(action.error)
        showError();
      })

      .addCase(updateFormInfo.rejected, (state, action) => {
        console.log(action.error)
        showError();
      });
  },
});

export const { updateForm, clearCurrentItem, setCurrentItem, resetState } =
  formBuilderSlice.actions;

export const selectForm = (state: RootState) => state.formBuilder.form;
export const selectCurrentItem = (state: RootState) =>
  state.formBuilder.currentItem;

export default formBuilderSlice.reducer;
