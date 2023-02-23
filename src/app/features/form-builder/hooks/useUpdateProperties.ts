import * as _ from "lodash";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext,
  FormField,
  UpdateFormField
} from "../../../models/form";
import { updateField } from "../slice";
import { useDebounced } from "./useDebounced";

type ResultType = {
  updateProperty: (properties: { [property: string]: any }) => void;
  updatePropertyImmediately: (properties: { [property: string]: any }) => void;
};

export const useUpdateProperties = (
  field: FormField,
  context: ActionContext
): ResultType => {
  const dispatch = useAppDispatch();

  const update = useDebounced((properties: { [property: string]: any }) => {
    const fieldClone = _.cloneDeep(field);
    const command: UpdateFormField = {
      fieldIndex: context.fieldIndex || 0,
      sectionIndex: context.sectionIndex,
      field: _.merge(fieldClone, properties),
    };
    dispatch(updateField(command));
  });

  const updateImmediately = (properties: { [property: string]: any }) => {
    const fieldClone = _.cloneDeep(field);
    const command: UpdateFormField = {
      fieldIndex: context.fieldIndex || 0,
      sectionIndex: context.sectionIndex,
      field: _.merge(fieldClone, properties),
    };
    dispatch(updateField(command));
  }

  const updateProperty = (properties: { [property: string]: any }) => {
    update(properties);
  };

  const updatePropertyImmediately = (properties: { [property: string]: any }) => {
    updateImmediately(properties);
  };

  return { updateProperty, updatePropertyImmediately };
};
