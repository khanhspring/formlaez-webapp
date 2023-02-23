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

const MaxProperty: FC<Props> = ({ field, context }) => {

    const { updatePropertyImmediately } = useUpdateProperties(field, context);

    if (!SupportedTypes.includes(field.type)) {
        return <></>
    }

    const onChange = ({ max }: { max: number }) => {
        updatePropertyImmediately({ max })
    }

    return (
        <Form
            onValuesChange={onChange}
            initialValues={{ max: field.max }}
        >
            <FormItem
                title="Max"
                name={'max'}
            >
                <InputNumber placeholder="Max" />
            </FormItem>
        </Form>
    );
}

export default MaxProperty;