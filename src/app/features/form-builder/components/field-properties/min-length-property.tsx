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

const MinLengthProperty: FC<Props> = ({ field, context }) => {

    const { updatePropertyImmediately } = useUpdateProperties(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ minLength }: { minLength: number }) => {
        updatePropertyImmediately({ minLength })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ minLength: field.minLength }}
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