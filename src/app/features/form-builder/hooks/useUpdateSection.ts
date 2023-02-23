import * as _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext, FormSection, UpdateFormSection
} from "../../../models/form";
import { updateSection } from "../slice";
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
    const sectionClone = _.cloneDeep(section);
    const command: UpdateFormSection = {
      sectionIndex: context.sectionIndex || 0,
      section: _.merge(sectionClone, newValues),
    };
    dispatch(updateSection(command));
  }, [context.sectionIndex, dispatch, section])

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
