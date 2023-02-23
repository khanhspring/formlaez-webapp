import * as _ from "lodash";
import { useState, useCallback, useEffect } from "react";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext,
  FormField,
  UpdateFormField,
} from "../../../models/form";
import { updateField } from "../slice";
import { useDebounced } from "./useDebounced";

type Values = { [property: string]: any };

type ResultType = {
  values: FormField;
  update: (properties: Values) => void;
  updateDebounce: (properties: Values) => void;
};

export const useUpdateField = (
  field: FormField,
  context: ActionContext
): ResultType => {

  const dispatch = useAppDispatch();
  const [values, setValues] = useState<FormField>(field);

  useEffect(() => {
    setValues(field);
  }, [field])

  const doUpdateDebounce = useDebounced((newValues: Values) => {
    doUpdate(newValues);
  });

  const doUpdate = useCallback((newValues: Values) => {
    const fieldClone = _.cloneDeep(field);
    const command: UpdateFormField = {
      fieldIndex: context.fieldIndex,
      sectionIndex: context.sectionIndex,
      field: _.merge(fieldClone, newValues),
    };
    dispatch(updateField(command));
  }, [context.fieldIndex, context.sectionIndex, dispatch, field]);

  const updateDebounce = (properties: Values) => {
    const newValues = { ...values, ...properties };
    setValues(newValues);
    doUpdateDebounce(newValues);
  };

  const update = (properties: Values) => {
    const newValues = { ...values, ...properties };
    setValues(newValues);
    doUpdate(newValues);
  };

  return { values, update, updateDebounce };
};
