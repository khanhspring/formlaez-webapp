import { FC } from "react";
import Editor from "../../../../components/editor/editor";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const TextField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);

    const onHtmlChange = (content?: string) => {
        updateDebounce({ content: content });
    }

    return (
        <Editor placeholder="No content..." initHtmlContent={values.content} onHtmlChange={onHtmlChange} />
    );
}

export default TextField;