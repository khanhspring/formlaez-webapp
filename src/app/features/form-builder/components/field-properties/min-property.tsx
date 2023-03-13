import Form from "rc-field-form";
import { FC } from "react";
import InputNumber from "../../../../components/form/form-controls/input-number";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField, FormFieldType } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
    disabled?: boolean;
}

const SupportedTypes: FormFieldType[] = ["InputNumber"]

const MinProperty: FC<Props> = ({ field, context, disabled }) => {

    const {values, update} = useUpdateField(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ min }: { min: number }) => {
        update({ min })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ min: values.min }}
        >
            <FormItem
                title="Min"
                name={'min'}
            >
                <InputNumber placeholder="Min" disabled={disabled}/>
            </FormItem>
        </Form>
    );
}

export default MinProperty;