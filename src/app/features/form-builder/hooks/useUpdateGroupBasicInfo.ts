import * as _ from "lodash";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext, FormSection, UpdateFormSection
} from "../../../models/form";
import { updateSection } from "../slice";
import { useDebounced } from "./useDebounced";

type ResultType = {
  title?: string;
  onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useUpdateGroupBasicInfo = (
  section: FormSection,
  context: ActionContext
): ResultType => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState(section.title);

  const update = useDebounced((section: FormSection) => {
    const sectionClone = _.cloneDeep(section);
    const command: UpdateFormSection = {
      sectionIndex: context.sectionIndex,
      section: _.merge(sectionClone, section),
    };
    dispatch(updateSection(command));
  });

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    update({
      title: e.target.value,
    });
  };

  return { title, onTitleChange };
};
