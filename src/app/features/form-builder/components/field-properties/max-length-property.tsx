import Form from "rc-field-form";
import { FC } from "react";
import FormItem from "../../../../components/form/form-item";
import InputNumber from "../../../../components/form/form-controls/input-number";
import { ActionContext, FormField, FormFieldType } from "../../../../models/form";
import { useUpdateProperties } from "../../hooks/useUpdateProperties";

type Props = {
    field: FormField;
    context: ActionContext;
}

const SupportedTypes: FormFieldType[] = ["InputText", "LongText", 'Email']

const MaxLengthProperty: FC<Props> = ({ field, context }) => {

    const { updatePropertyImmediately } = useUpdateProperties(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ maxLength }: { maxLength: number }) => {
        updatePropertyImmediately({ maxLength })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ maxLength: field.maxLength }}
        >
            <FormItem
                title="Max length"
                name={'maxLength'}
            >
                <InputNumber placeholder="Max length" />
            </FormItem>
        </Form>
    );
}

export default MaxLengthProperty;