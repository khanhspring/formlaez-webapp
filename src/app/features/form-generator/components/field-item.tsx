import { FC } from "react";
import Input from "../../../components/form/form-controls/input";
import FormItem from "../../../components/form/form-item";
import { FormField } from "../../../models/form";

type Props = {
    field: FormField;
    fieldIndex: number;
}

const FieldItem: FC<Props> = ({ field }) => {

    return (
        <FormItem
            name={field.variableName}
            title={field.title}
        >
            <Input placeholder={field.placeholder} />
        </FormItem>
    );
}

export default FieldItem;