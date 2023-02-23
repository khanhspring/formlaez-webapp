import * as _ from "lodash";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/redux-hook";
import {
  ActionContext,
  FormField,
  UpdateFormField,
} from "../../../models/form";
import { updateField } from "../slice";
import { useDebounced } from "./useDebounced";

type DebouncedType = _.DebouncedFunc<(url: string) => void>;

type ResultType = {
  url?: string;
  caption?: string;
  onUrlChange: (value?: string) => void;
  onCaptionChange: (value?: string) => void;
  update: DebouncedType;
};

export const useUpdateMedia = (
  field: FormField,
  context: ActionContext
): ResultType => {
  const dispatch = useAppDispatch();

  const [url, setUrl] = useState(field.url);
  const [caption, setCaption] = useState(field.caption);

  const update = useDebounced(({url, caption}: {url: string, caption: string}) => {
    const fieldClone = _.cloneDeep(field);
    const command: UpdateFormField = {
      fieldIndex: context.fieldIndex || 0,
      sectionIndex: context.sectionIndex,
      field: _.merge(fieldClone, { url, caption }),
    };
    dispatch(updateField(command));
  });

  const onUrlChange = (value?: string) => {
    setUrl(value);
    update({
      url: value,
    });
  };

  const onCaptionChange = (value?: string) => {
    setCaption(value);
    update({
      caption: value,
    });
  };

  return { url, caption, onCaptionChange, onUrlChange, update };
};
