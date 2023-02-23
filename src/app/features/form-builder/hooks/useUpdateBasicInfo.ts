import * as _ from "lodash";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext,
  FormField,
  FormFieldOption,
  UpdateFormField,
} from "../../../models/form";
import { updateField } from "../slice";
import { useDebounced } from "./useDebounced";

type DebouncedType = _.DebouncedFunc<(basicInfo: FormField) => void>;

type ResultType = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  hideTitle?: boolean;
  options?: FormFieldOption[];
  onLabelChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onPlaceholderChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => void;
  onRequiredChange?: (value: boolean) => void;
  onHideTitleChange?: (value: boolean) => void;
  onOptionsChange?: (options: FormFieldOption[]) => void;
  update?: DebouncedType;
};

export const useUpdateBasicInfo = (
  field?: FormField,
  context?: ActionContext
): ResultType => {
  const dispatch = useAppDispatch();

  const [label, setLabel] = useState(field?.title);
  const [placeholder, setPlaceholder] = useState(field?.placeholder);
  const [required, setRequired] = useState(field?.required);
  const [hideTitle, setHideTitle] = useState(field?.hideTitle);
  const [options, setOptions] = useState(field?.options);

  const update = useDebounced((basicInfo: FormField) => {
    const fieldClone = _.cloneDeep(field);
    const command: UpdateFormField = {
      fieldIndex: context?.fieldIndex || 0,
      sectionIndex: context?.sectionIndex,
      field: _.merge(fieldClone, basicInfo),
    };
    dispatch(updateField(command));
  });

  const updateImmediately = (basicInfo: any) => {
    const fieldClone = _.cloneDeep(field);
    const command: UpdateFormField = {
      fieldIndex: context?.fieldIndex || 0,
      sectionIndex: context?.sectionIndex,
      field: _.merge(fieldClone, basicInfo),
    };
    dispatch(updateField(command));
  };

  const onLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    update({
      title: e.target.value,
    });
  };

  const onPlaceholderChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
  ) => {
    let value;
    if (typeof e === "string") {
      value = e;
    } else {
      value = e.target.value;
    }

    setPlaceholder(value);
    update({
      placeholder: value,
    });
  };

  const onRequiredChange = (value?: boolean) => {
    setRequired(value);
    updateImmediately({
      required: value,
    });
  };

  const onHideTitleChange = (value?: boolean) => {
    setHideTitle(value);
    updateImmediately({
      hideTitle: value,
    });
  };

  const onOptionsChange = (options: FormFieldOption[]) => {
    setOptions(options);
    update({
      options,
    });
  };

  return {
    label,
    placeholder,
    required,
    hideTitle,
    options,
    onLabelChange,
    onPlaceholderChange,
    onRequiredChange,
    onHideTitleChange,
    onOptionsChange,
    update,
  };
};
