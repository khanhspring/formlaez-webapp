import { Field } from "rc-field-form";
import type { FieldProps } from 'rc-field-form/lib/Field';
import { cloneElement, FC, ReactElement } from "react";
import FormItemError from "./form-item-error";
import FormItemLabel from "./form-item-label";

type RcFieldProps<Values = any> = Omit<FieldProps<Values>, 'children'>;

type Props = RcFieldProps & {
    title?: string;
    hideTitle?: boolean;
    children?: ReactElement;
    hideError?: boolean;
}

const FormItem: FC<Props> = ({ title, hideTitle, hideError, children, ...rest }) => {

    const isRequired = rest.rules?.some((rule: any) => rule.required);

    return (
        <Field {...rest}>
            {(control, meta, form) => {
                return (
                    <div
                        className="flex flex-col w-full"
                        id={`form-item_${meta.name.join("-")}`}
                    >
                        {!hideTitle && <FormItemLabel content={title} required={isRequired} />}
                        {children && cloneElement(children, { ...children.props, ...control, status: meta.errors?.length > 0 ? 'error' : undefined })}
                        {!hideError && <FormItemError meta={meta} />}
                    </div>
                );
            }}
        </Field>
    );
}

export default FormItem;