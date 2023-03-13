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

const MaxProperty: FC<Props> = ({ field, context, disabled }) => {

    const {values, update} = useUpdateField(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ max }: { max: number }) => {
        update({ max })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ max: values.max }}
        >
            <FormItem
                title="Max"
                name={'max'}
            >
                <InputNumber placeholder="Max" disabled={disabled}/>
            </FormItem>
        </Form>
    );
}

export default MaxProperty;