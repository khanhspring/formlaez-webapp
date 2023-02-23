import { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState } from "react";
import { orElseEmptyString } from "../../../util/common";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    prefix?: string | ReactElement;
    status?: FieldStatus;
}

const Input: FC<Props> = ({ className = '', status, value, ...rest }) => {

    const [internalValue, setInternalValue] = useState(value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInternalValue(value);
        rest.onChange?.(e);
    }

    return (
        <div className="w-full">
            <input
                {...rest}
                onChange={onValueChange}
                value={orElseEmptyString(internalValue)}
                className={
                    'w-full rounded outline-none px-4 py-2 text-sm border-none dark:bg-cinder-700 placeholder:text-gray-500'
                    + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
                    + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
                    + `${status && status === 'success' ? 'dark:border-green-700' : ''} `
                    + className
                }
            />
        </div>
    );
}

export default Input;
