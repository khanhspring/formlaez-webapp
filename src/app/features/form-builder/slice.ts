import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { toast } from "react-toastify";
import { RootState } from "../../../store";
import {
  ActionContext,
  AddFormField,
  AddFormSection,
  CreateFormFieldRequest,
  CreateFormSectionRequest,
  DuplicateFormField,
  DuplicateSection,
  Form,
  MoveFormFieldRequest,
  MoveFormSectionRequest,
  PartialUpdateFormField,
  PartialUpdateFormSection,
  RemoveFormField,
  RemoveFormSection,
  ReorderFormField,
  ReorderFormSection,
  UpdateFormField,
  UpdateFormFieldRequest,
  UpdateFormInfo,
  UpdateFormRequest,
  UpdateFormSection,
  UpdateFormSectionRequest,
} from "../../models/form";
import FormFieldService from "../../services/form-field-service";
import FormSectionService from "../../services/form-section-service";
import FormService from "../../services/form-service";
import FormUtil from "./utils/form-util";

export const loadForm = createAsyncThunk(
  "form/loadForm",
  async (formCode: string) => {
    return await FormService.getFormDetailByCode(formCode);
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

    const [formResult, newSection, addedIndex] = result;
    thunkAPI.dispatch(updateForm(formResult));

    const request: CreateFormSectionRequest = {
      ...newSection,
      pageId: formResult.pages[0].id,
      position: addedIndex,
    };

    try {
      return await FormSectionService.create(request);
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

    const [formResult, newSection, addedIndex] = result;
    thunkAPI.dispatch(updateForm(formResult));

    const request: CreateFormSectionRequest = {
      ...newSection,
      pageId: formResult.pages[0].id,
      position: addedIndex,
    };
    try {
      return await FormSectionService.create(request);
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

    const [formResult, section, newField, addedIndex] = result;
    thunkAPI.dispatch(updateForm(formResult));

    const request: CreateFormFieldRequest = {
      ...newField,
      sectionCode: section.code,
      position: addedIndex,
    };

    try {
      return await FormFieldService.create(request);
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

    const [formResult, movedSection] = result;

    thunkAPI.dispatch(updateForm(formResult));

    const request: MoveFormSectionRequest = {
      sectionCode: movedSection.code,
      newPosition: command.toIndex,
    };

    try {
      return await FormSectionService.move(request);
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

    const [formResult, movedField] = result;

    thunkAPI.dispatch(updateForm(formResult));

    const request: MoveFormFieldRequest = {
      fieldCode: movedField.code,
      newPosition: command.toIndex
    }

    try {
      return await FormFieldService.move(request);
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
      return await FormSectionService.remove(removedSection.code);
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
      return await FormFieldService.remove(removedField.code);
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

    const request: UpdateFormFieldRequest = {
      ...updatedField,
    };

    try {
      return await FormFieldService.update(request);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const updateFieldPartial = createAsyncThunk(
  "form/updateFieldPartial",
  async (command: PartialUpdateFormField, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      // thunkAPI.abort(); // TODO: error on click back
      return;
    }

    const result = FormUtil.updateFieldPartial(
      formBuilderState.form,
      command.values,
      command.sectionIndex,
      command.fieldIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, updatedField] = result;
    thunkAPI.dispatch(updateForm(formResult));

    const request: UpdateFormFieldRequest = {
      ...updatedField,
    };

    try {
      return await FormFieldService.update(request);
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

    const request: UpdateFormSectionRequest = {
      ...updatedSection,
    };

    try {
      return await FormSectionService.update(request);
    } catch (err) {
      thunkAPI.dispatch(loadForm(formBuilderState.form.code));
      throw err;
    }
  }
);

export const updateSectionPartial = createAsyncThunk(
  "form/updateSectionPartial",
  async (command: PartialUpdateFormSection, thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const formBuilderState = state.formBuilder as FormBuilderState;

    if (!formBuilderState?.form) {
      thunkAPI.abort();
      return;
    }

    const result = FormUtil.updateSectionPartial(
      formBuilderState.form,
      command.values,
      command.sectionIndex
    );

    if (!result) {
      thunkAPI.abort();
      return;
    }
    const [formResult, updatedSection] = result;
    thunkAPI.dispatch(updateForm(formResult));

    const request: UpdateFormSectionRequest = {
      ...updatedSection,
    };
    try {
      return await FormSectionService.update(request);
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
    const [formResult, newSection, addedIndex] = result;
    thunkAPI.dispatch(updateForm(formResult));

    const request: CreateFormSectionRequest = {
      ...newSection,
      pageId: formResult.pages[0].id,
      position: addedIndex,
    };

    try {
      return await FormSectionService.create(request);
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
    const [formResult, section, newField, addedIndex] = result;
    thunkAPI.dispatch(updateForm(formResult));

    const request: CreateFormFieldRequest = {
      ...newField,
      sectionCode: section.code,
      position: addedIndex,
    };

    try {
      return await FormFieldService.create(request);
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

    const request: UpdateFormRequest = {
      title: form.title,
      description: form.description,
      coverType: form.coverType,
      coverColor: form.coverColor,
      coverImageUrl: form.coverImageUrl,
      id: form.id,
    };

    try {
      return await FormService.update(request);
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
        showError();
      })

      .addCase(addSingleField.rejected, (state, action) => {
        showError();
      })

      .addCase(addGroupField.rejected, (state, action) => {
        showError();
      })

      .addCase(addSection.rejected, (state, action) => {
        showError();
      })

      .addCase(reorderField.rejected, (state, action) => {
        showError();
      })

      .addCase(reorderSection.rejected, (state, action) => {
        showError();
      })

      .addCase(removeSection.rejected, (state, action) => {
        showError();
      })

      .addCase(removeField.rejected, (state, action) => {
        showError();
      })

      .addCase(updateField.rejected, (state, action) => {
        showError();
      })

      .addCase(updateSection.rejected, (state, action) => {
        showError();
      })

      .addCase(duplicateSection.rejected, (state, action) => {
        showError();
      })

      .addCase(duplicateField.rejected, (state, action) => {
        showError();
      })

      .addCase(updateFormInfo.rejected, (state, action) => {
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
