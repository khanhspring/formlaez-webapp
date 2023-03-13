import Form, { useForm } from "rc-field-form";
import { FC, useRef } from "react";
import Input from "../../../../components/form/form-controls/input";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormSection } from "../../../../models/form";
import { useUpdateSection } from "../../hooks/useUpdateSection";

type Props = {
    section: FormSection;
    context: ActionContext;
    disabled?: boolean;
}

const VariableNameProperty: FC<Props> = ({ section, context, disabled }) => {

    const {values, update} = useUpdateSection(section, context);
    const timeout = useRef<any>(null);
    const [form] = useForm();

    const onChange = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            form.validateFields(['variableName'])
            .then((values) => {
                update({ variableName: values.variableName })
            })
            .catch();
        }, 1000)
    }

    return (
        <Form
            form={form}
            onValuesChange={onChange}
            initialValues={{ variableName: values.variableName }}
        >
            <FormItem
                title="Variable name"
                name={'variableName'}
                rules={[
                    { required: true, message: 'This field is required' },
                ]}
            >
                <Input placeholder="Eg: EmployeeInfo" disabled={disabled}/>
            </FormItem>
        </Form>
    );
}

export default VariableNameProperty;