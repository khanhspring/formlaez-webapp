import { nanoid } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { newId } from "../../../constants/config-fields";
import { Form, FormField, FormSection } from "../../../models/form";

const addSingleField = (
  form: Form,
  field: FormField,
  sectionIndex?: number
): [Form, FormSection, number] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  let sections = page.sections;

  if (!sections) {
    page.sections = [];
    sections = page.sections;
  }

  const newSection: FormSection = {
    code: nanoid(),
    type: "Single",
    variableName: nanoid(),
    fields: [field],
  };

  sections.splice(sectionIndex + 1, 0, newSection);
  return [formClone, newSection, sectionIndex + 1];
};

const addGroupField = (
  form: Form,
  field: FormField,
  sectionIndex?: number,
  fieldIndex?: number
): [Form, FormSection, FormField, number] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  if (!_.isNumber(fieldIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  let sections = page.sections;

  if (!sections || sections.length === 0) {
    return;
  }

  const section = sections[sectionIndex];
  let fields = section.fields;
  if (!fields) {
    section.fields = [];
    fields = section.fields;
  }

  fields.splice(fieldIndex + 1, 0, field);
  return [formClone, section, field, fieldIndex + 1];
};

const addSection = (
  form: Form,
  section: FormSection,
  index?: number
): [Form, FormSection, number] | undefined => {
  if (!_.isNumber(index)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  let sections = page.sections;

  if (!sections) {
    page.sections = [];
    sections = page.sections;
  }

  sections.splice(index + 1, 0, section);
  return [formClone, section, index + 1];
};

const addSections = (
  form: Form,
  sections: FormSection[],
  index?: number
): [Form, FormSection[], number] | undefined => {
  if (!_.isNumber(index)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  let pageSections = page.sections;

  if (!pageSections) {
    page.sections = [];
    pageSections = page.sections;
  }

  pageSections.splice(index + 1, 0, ...sections);
  return [formClone, sections, index + 1];
};

const reorderSection = (
  form: Form,
  fromIndex: number,
  toIndex: number
): [Form, FormSection] | undefined => {
  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const tmp = sections.splice(fromIndex, 1);
  sections.splice(toIndex, 0, tmp[0]);
  return [formClone, tmp[0]];
};

const reorderField = (
  form: Form,
  sectionCode: string,
  fromIndex: number,
  toIndex: number
): [Form, FormField] | undefined => {
  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const section = sections.find((item) => item.code === sectionCode);

  const fields = section?.fields || [];
  if (fields.length === 0) {
    return;
  }

  const tmp = fields.splice(fromIndex, 1);
  fields.splice(toIndex, 0, tmp[0]);
  return [formClone, tmp[0]];
};

const removeSection = (
  form: Form,
  sectionIndex?: number
): [Form, FormSection] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0 || sections.length <= sectionIndex) {
    return;
  }

  const removed = sections.splice(sectionIndex, 1);
  return [formClone, removed[0]];
};

const removeSections = (
  form: Form,
  codes?: string[]
): [Form, FormSection[]] | undefined => {
  if (!codes || _.isEmpty(codes)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  const removedItems: FormSection[] = [];
  for (const code of codes) {
    const sectionIndex = sections.findIndex(item => item.code === code);
    const removed = sections.splice(sectionIndex, 1);
    removedItems.push(removed[0]);
  }
  return [formClone, removedItems];
};

const removeField = (
  form: Form,
  sectionIndex?: number,
  fieldIndex?: number
): [Form, FormField] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  if (!_.isNumber(fieldIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const section = sections[sectionIndex];
  const fields = section?.fields || [];

  if (fields.length === 0) {
    return;
  }

  const removed = fields.splice(fieldIndex, 1);
  return [formClone, removed[0]];
};

const updateField = (
  form: Form,
  field: FormField,
  sectionIndex?: number,
  fieldIndex?: number
): [Form, FormField] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  if (!_.isNumber(fieldIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const section = sections[sectionIndex];
  const fields = section?.fields || [];

  if (fields.length === 0 || fields.length <= fieldIndex) {
    return;
  }

  const targetField = fields[fieldIndex];
  const updatedField = _.extend(targetField, field);
  fields[fieldIndex] = updatedField;

  return [formClone, updatedField];
};

const updateFieldPartial = (
  form: Form,
  values: {[key: string]: any},
  sectionIndex?: number,
  fieldIndex?: number
): [Form, FormField] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  if (!_.isNumber(fieldIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const section = sections[sectionIndex];
  const fields = section?.fields || [];

  if (fields.length === 0 || fields.length <= fieldIndex) {
    return;
  }

  const targetField = fields[fieldIndex];
  const updatedField = _.extend(targetField, values);
  fields[fieldIndex] = updatedField;

  return [formClone, updatedField];
};

const updateSection = (
  form: Form,
  section: FormSection,
  sectionIndex?: number,
): [Form, FormSection] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const targetSection = sections[sectionIndex];
  const updatedSection = _.extend(targetSection, section);
  sections[sectionIndex] = updatedSection;

  return [formClone, updatedSection];
};

const updateSectionPartial = (
  form: Form,
  values: {[key: string]: any},
  sectionIndex?: number,
): [Form, FormSection] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const targetSection = sections[sectionIndex];
  const updatedSection = _.extend(targetSection, values);
  sections[sectionIndex] = updatedSection;

  return [formClone, updatedSection];
};

const duplicateSection = (
  form: Form,
  sectionIndex?: number
): [Form, FormSection, number] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0 || sections.length <= sectionIndex) {
    return;
  }

  const sectionClone = _.cloneDeep(sections[sectionIndex]);

  sectionClone.id = undefined;
  sectionClone.code = nanoid();
  sectionClone.variableName = newId();

  sectionClone.fields?.forEach(field => {
    field.id = undefined;
    field.code = nanoid();
    field.variableName = newId();
    field.options?.forEach(option => {
      option.code = nanoid();
    })
  })

  sections.splice(sectionIndex + 1, 0, sectionClone);

  return [formClone, sectionClone, sectionIndex + 1];
};

const duplicateField = (
  form: Form,
  sectionIndex?: number,
  fieldIndex?: number
): [Form, FormSection, FormField, number] | undefined => {
  if (!_.isNumber(sectionIndex)) {
    return;
  }

  if (!_.isNumber(fieldIndex)) {
    return;
  }

  const formClone = _.cloneDeep(form);
  if (!formClone) {
    return;
  }

  const page = formClone.pages[0];
  const sections = page.sections || [];

  if (sections.length === 0) {
    return;
  }

  const section = sections[sectionIndex];
  const fields = section?.fields || [];

  if (fields.length === 0) {
    return;
  }

  const fieldClone = _.cloneDeep(fields[fieldIndex]);
  fieldClone.id = undefined;
  fieldClone.code = nanoid();
  fieldClone.variableName = newId();

  fields.splice(fieldIndex + 1, 0, fieldClone);
  return [formClone, section, fieldClone, fieldIndex + 1];
};

const FormUtil = {
  addSingleField,
  addGroupField,
  addSection,
  addSections,
  reorderSection,
  reorderField,
  removeSection,
  removeSections,
  removeField,
  updateField,
  updateFieldPartial,
  updateSection,
  updateSectionPartial,
  duplicateSection,
  duplicateField
};

export default FormUtil;
