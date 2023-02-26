import { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState } from "react";
import { orElseEmptyString } from "../../../util/common";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    suffix?: string | ReactElement;
}

const Input: FC<Props> = ({ className = '', status, value, suffix, ...rest }) => {

    const [internalValue, setInternalValue] = useState(value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInternalValue(value);
        rest.onChange?.(e);
    }

    return (
        <div className={
            `w-full relative flex rounded border border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
            + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
            + `${status && status === 'success' ? 'dark:border-green-700' : ''} `
        }>
            <input
                {...rest}
                onChange={onValueChange}
                value={orElseEmptyString(internalValue)}
                className={
                    'w-full outline-none px-4 py-2 text-sm dark:bg-cinder-700 placeholder:text-gray-500 rounded-l '
                    + className
                }
            />
            {
                suffix &&
                <div className="flex items-center justify-center pr-3">
                    {suffix}
                </div>
            }
        </div>
    );
}

export default Input;
