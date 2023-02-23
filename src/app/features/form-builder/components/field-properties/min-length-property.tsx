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

const MinLengthProperty: FC<Props> = ({ field, context }) => {

    const {values, update} = useUpdateField(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ minLength }: { minLength: number }) => {
        update({ minLength })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ minLength: values.minLength }}
        >
            <FormItem
                title="Min length"
                name={'minLength'}
            >
                <InputNumber placeholder="Min length" min="1" />
            </FormItem>
        </Form>
    );
}

export default MinLengthProperty;