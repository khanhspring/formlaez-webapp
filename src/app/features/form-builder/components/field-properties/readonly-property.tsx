import Form, { useForm } from "rc-field-form";
import Switch from "rc-switch";
import { FC } from "react";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";
import FieldUtil from "../../utils/field-util";

type Props = {
    field: FormField;
    context: ActionContext;
    disabled?: boolean;
}

const ReadonlyProperty: FC<Props> = ({ field, context, disabled }) => {

    const {values, update} = useUpdateField(field, context);
    const [form] = useForm();

    if (!FieldUtil.isFormControl(field)) {
        return <></>
    }

    const onChange = ({ readonly }: { readonly: boolean }) => {
        update({ readonly })
    }

    return (
        <Form
            form={form}
            onValuesChange={onChange}
            initialValues={{ readonly: values.readonly }}
        >
            <FormItem
                title="Readonly"
                name={'readonly'}
                valuePropName="checked"
            >
                <Switch disabled={disabled}/>
            </FormItem>
        </Form>
    );
}

export default ReadonlyProperty;