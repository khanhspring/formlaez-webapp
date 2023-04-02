import { FC } from "react";
import Editor from "../../../../components/editor/editor";
import { useAppSelector } from "../../../../hooks/redux-hook";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import { selectForm } from "../../slice";

type Props = {
    field: FormField;
    context: ActionContext;
}

const TextField: FC<Props> = ({ field, context }) => {

    const { values, updateDebounce } = useUpdateField(field, context);
    const formInfo = useAppSelector(selectForm);

    const onHtmlChange = (content?: string) => {
        updateDebounce({ content: content });
    }

    return (
        <>
            {
                formInfo?.status !== 'Archived' &&
                <Editor
                    placeholder="No content..."
                    initHtmlContent={values.content}
                    onHtmlChange={onHtmlChange}
                />
            }
            {
                formInfo?.status === 'Archived' &&
                <div className="w-full">
                    <div className="prose prose-base dark:prose-invert max-w-full" dangerouslySetInnerHTML={{ __html: values.content || '' }} />
                </div>
            }
        </>
    );
}

export default TextField;