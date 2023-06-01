import * as _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext,
  FormField,
  PartialUpdateFormField
} from "../../../models/form";
import { updateFieldPartial } from "../slice";
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
  const [values, setValues] = useState<FormField>(_.cloneDeep(field));

  useEffect(() => {
    setValues(field);
  }, [field])

  const doUpdateDebounce = useDebounced((newValues: Values) => {
    doUpdate(newValues);
  });

  const doUpdate = useCallback((newValues: Values) => {
    const command: PartialUpdateFormField = {
      fieldIndex: context.fieldIndex,
      sectionIndex: context.sectionIndex,
      values: newValues,
    };
    dispatch(updateFieldPartial(command));
  }, [context.fieldIndex, context.sectionIndex, dispatch]);

  const updateDebounce = (properties: Values) => {
    const newValues = { ...values, ...properties };
    setValues(newValues);
    doUpdateDebounce(properties);
  };

  const update = (properties: Values) => {
    const newValues = { ...values, ...properties };
    setValues(newValues);
    doUpdate(properties);
  };

  return { values, update, updateDebounce };
};
