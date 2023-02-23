import { FORM } from "../features/form-builder/data";
import { Form, FormField, FormSection } from "../models/form";

function findFormByCode(formCode: string): Promise<Form> {
  return new Promise<Form>((resolve, rejected) =>
    setTimeout(() => resolve(FORM), 1000)
  );
}

function addFormSection(request: FormSection): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function addGroupField(request: FormField): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function reorderSection(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function reorderField(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function removeSection(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function removeField(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function updateField(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

function updateSection(request: any): Promise<any> {
  return new Promise<any>((resolve, rejected) =>
    setTimeout(() => resolve({ id: 1 }), 500)
  );
}

const FormService = {
  findFormByCode,
  addFormSection,
  addGroupField,
  reorderSection,
  reorderField,
  removeSection,
  removeField,
  updateField,
  updateSection
};

export default FormService;
