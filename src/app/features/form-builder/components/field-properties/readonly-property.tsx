import Form, { useForm } from "rc-field-form";
import Switch from "rc-switch";
import { FC } from "react";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField } from "../../../../models/form";
import { useUpdateProperties } from "../../hooks/useUpdateProperties";
import FieldUtil from "../../utils/field-util";

type Props = {
    field: FormField;
    context: ActionContext;
}

const ReadonlyProperty: FC<Props> = ({ field, context }) => {

    const { updatePropertyImmediately } = useUpdateProperties(field, context);
    const [form] = useForm();

    if (!FieldUtil.isFormControl(field)) {
        return <></>
    }

    const onChange = ({ readonly }: { readonly: boolean }) => {
        updatePropertyImmediately({ readonly })
    }

    return (
        <Form
            form={form}
            onValuesChange={onChange}
            initialValues={{ readonly: field.readonly }}
        >
            <FormItem
                title="Readonly"
                name={'readonly'}
                valuePropName="checked"
            >
                <Switch />
            </FormItem>
        </Form>
    );
}

export default ReadonlyProperty;