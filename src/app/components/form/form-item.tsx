import { Field } from "rc-field-form";
import type { FieldProps } from 'rc-field-form/lib/Field';
import { cloneElement, FC, ReactElement } from "react";
import FormItemError from "./form-item-error";
import FormItemLabel from "./form-item-label";

type RcFieldProps<Values = any> = Omit<FieldProps<Values>, 'children'>;

type Props = RcFieldProps & {
    title?: string;
    children?: ReactElement;
    hideError?: boolean;
}

const FormItem: FC<Props> = ({ title, hideError, children, ...rest }) => {

    const isRequired = rest.rules?.some((rule: any) => rule.required);

    return (
        <Field {...rest}>
            {(control, meta, form) => {
                return (
                    <>
                        <FormItemLabel content={title} required={isRequired}/>
                        {children && cloneElement(children, { ...children.props, status: meta.errors?.length > 0 ? 'error' : undefined, ...control })}
                        { !hideError && <FormItemError meta={meta} />}
                    </>
                );
            }}
        </Field>
    );
}

export default FormItem;