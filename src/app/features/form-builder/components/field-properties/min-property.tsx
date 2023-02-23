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

const SupportedTypes: FormFieldType[] = ["InputNumber"]

const MinProperty: FC<Props> = ({ field, context }) => {

    const { updatePropertyImmediately } = useUpdateProperties(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ min }: { min: number }) => {
        updatePropertyImmediately({ min })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ min: field.min }}
        >
            <FormItem
                title="Min"
                name={'min'}
            >
                <InputNumber placeholder="Min" />
            </FormItem>
        </Form>
    );
}

export default MinProperty;