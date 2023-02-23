import Form, { useForm } from "rc-field-form";
import { FC, useRef } from "react";
import Input from "../../../../components/form/form-controls/input";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField } from "../../../../models/form";
import { doNothing } from "../../../../util/common";
import { useUpdateProperties } from "../../hooks/useUpdateProperties";
import FieldUtil from "../../utils/field-util";

type Props = {
    field: FormField;
    context: ActionContext;
}

const VariableNameProperty: FC<Props> = ({ field, context }) => {

    const { updatePropertyImmediately } = useUpdateProperties(field, context);
    const timeout = useRef<any>(null);
    const [form] = useForm();

    if (!FieldUtil.isFormControl(field)) {
        return <></>
    }

    const onChange = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            form.validateFields(['variableName'])
            .then((values) => {
                updatePropertyImmediately({ variableName: values.variableName })
            })
            .catch();
        }, 1000)
    }

    return (
        <Form
            form={form}
            onValuesChange={onChange}
            initialValues={{ variableName: field.variableName }}
        >
            <FormItem
                title="Variable name"
                name={'variableName'}
                rules={[
                    { required: true, message: 'This field is required' },
                ]}
            >
                <Input placeholder="Eg: FirstName" />
            </FormItem>
        </Form>
    );
}

export default VariableNameProperty;