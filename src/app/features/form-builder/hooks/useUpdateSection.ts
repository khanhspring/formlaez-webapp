import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext, FormSection, PartialUpdateFormSection
} from "../../../models/form";
import { updateSectionPartial } from "../slice";
import { useDebounced } from "./useDebounced";

type Values = {[property: string]: any};

type ResultType = {
  values: FormSection;
  update: (properties: Values) => void;
  updateDebounce: (properties: Values) => void;
};

export const useUpdateSection = (
  section: FormSection,
  context: ActionContext
): ResultType => {

  const dispatch = useAppDispatch();
  const [values, setValues] = useState<FormSection>(section);

  useEffect(() => {
    setValues(section);
  }, [section]);

  const doUpdateDebounce = useDebounced((newValues: Values) => {
    doUpdate(newValues);
  });

  const doUpdate = useCallback((newValues: Values) => {
    const command: PartialUpdateFormSection = {
      sectionIndex: context.sectionIndex || 0,
      values: newValues
    };
    dispatch(updateSectionPartial(command));
  }, [context.sectionIndex, dispatch])

  const updateDebounce = (properties: Values) => {
    const newValues = {...values, ...properties};
    setValues(newValues);
    doUpdateDebounce(newValues);
  };

  const update = (properties: Values) => {
    const newValues = {...values, ...properties};
    setValues(newValues);
    doUpdate(newValues);
  };

  return { values, update, updateDebounce };
};
