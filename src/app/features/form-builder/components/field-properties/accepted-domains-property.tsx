import Form, { useForm } from "rc-field-form";
import { FC, useRef } from "react";
import Input from "../../../../components/form/form-controls/input";
import FormItem from "../../../../components/form/form-item";
import { ActionContext, FormField, FormFieldType } from "../../../../models/form";
import { useUpdateField } from "../../hooks/useUpdateField";

type Props = {
    field: FormField;
    context: ActionContext;
    disabled?: boolean;
}

const SupportedTypes: FormFieldType[] = ['Email']

const AcceptedDomainsProperty: FC<Props> = ({ field, context, disabled }) => {

    const {values, update} = useUpdateField(field, context);

    const timeout = useRef<any>(null);
    const [form] = useForm();

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = () => {
        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            form.validateFields(['acceptedDomains'])
                .then((values) => {
                    update({ acceptedDomains: values.acceptedDomains })
                })
                .catch();
        }, 1000)
    }

    return (
        <Form
            form={form}
            onValuesChange={onChange}
            initialValues={{ variableName: values.acceptedDomains }}
        >
            <FormItem
                title="Accepted domains"
                name={'acceptedDomains'}
                rules={[
                    { pattern: /^(([a-zA-Z0-9.-]+)((\s*),(\s*))?)+$/g, message: 'Incorrect format' },
                ]}
            >
                <Input placeholder="Eg: gmail.com,example.com.vn" disabled={disabled}/>
            </FormItem>
        </Form>
    );
}

export default AcceptedDomainsProperty;