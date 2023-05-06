import { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState } from "react";
import { orElseEmptyString } from "../../../util/common";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    suffix?: string | ReactElement<any>;
    wrapClassName?: string;
    type?: 'text' | 'password';
}

const Input: FC<Props> = ({ className = '', status, value, suffix, wrapClassName, type = 'text', ...rest }) => {

    const [internalValue, setInternalValue] = useState(value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInternalValue(value);
        rest.onChange?.(e);
    }

    return (
        <div className={
            `w-full relative flex rounded border bg-white border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 dark:hover:border-steel-gray-700 shadow-sm `
            + `${wrapClassName} `
            + `${status && status === 'error' ? '!border-rose-700' : ''} `
            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
            + `${status && status === 'success' ? '!border-green-700' : ''} `
        }>
            <input
                {...rest}
                onChange={onValueChange}
                value={orElseEmptyString(internalValue)}
                className={
                    'w-full outline-none px-4 py-2 text-base bg-transparent placeholder:text-gray-500 rounded-l '
                    + className
                }
                type={type}
            />
            {
                suffix &&
                <div className="flex items-center justify-center pr-3 rounded-lg">
                    {suffix}
                </div>
            }
        </div>
    );
}

export default Input;
