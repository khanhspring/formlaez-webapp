import { FormField, FormFieldType } from "../../../models/form";

const FormControls: FormFieldType[] = [
  'Datetime',
  'InputNumber',
  'InputText',
  'LongText',
  'Dropdown',
  'Email',
  "MultipleChoice",
  'OpinionScale',
  'PictureChoice',
  "Rating",
  "Switch",
  "Signature",
  "InputMarkdown",
  "InputUrl",
  "StatusList"
]

const isFormControl = (field?: FormField): boolean => {
  if (!field) {
    return false;
  }
  return FormControls.includes(field.type);
};

const FieldUtil = {
  isFormControl,
};

export default FieldUtil;
