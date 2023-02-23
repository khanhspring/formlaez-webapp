import Form from "rc-field-form";
import { FC } from "react";
import InputNumber from "../../../../components/form/form-controls/input-number";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField, FormFieldType } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
}

const SupportedTypes: FormFieldType[] = ["InputText", "LongText", 'Email']

const MaxLengthProperty: FC<Props> = ({ field, context }) => {

    const {values, update} = useUpdateField(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ maxLength }: { maxLength: number }) => {
        update({ maxLength })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ maxLength: values.maxLength }}
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