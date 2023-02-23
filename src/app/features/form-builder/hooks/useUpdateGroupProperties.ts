import * as _ from "lodash";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext,
  FormField,
  FormSection,
  UpdateFormField,
  UpdateFormSection
} from "../../../models/form";
import { updateField, updateSection } from "../slice";
import { useDebounced } from "./useDebounced";

type ResultType = {
  updateProperty: (properties: { [property: string]: any }) => void;
  updatePropertyImmediately: (properties: { [property: string]: any }) => void;
};

export const useUpdateGroupProperties = (
  section: FormSection,
  context: ActionContext
): ResultType => {
  const dispatch = useAppDispatch();

  const update = useDebounced((properties: { [property: string]: any }) => {
    const sectionClone = _.cloneDeep(section);
    const command: UpdateFormSection = {
      sectionIndex: context.sectionIndex || 0,
      section: _.merge(sectionClone, properties),
    };
    dispatch(updateSection(command));
  });

  const updateImmediately = (properties: { [property: string]: any }) => {
    const sectionClone = _.cloneDeep(section);
    const command: UpdateFormSection = {
      sectionIndex: context.sectionIndex || 0,
      section: _.merge(sectionClone, properties),
    };
    dispatch(updateSection(command));
  }

  const updateProperty = (properties: { [property: string]: any }) => {
    update(properties);
  };

  const updatePropertyImmediately = (properties: { [property: string]: any }) => {
    updateImmediately(properties);
  };

  return { updateProperty, updatePropertyImmediately };
};
