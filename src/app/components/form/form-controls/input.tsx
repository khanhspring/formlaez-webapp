import { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState } from "react";
import { orElseEmptyString } from "../../../util/common";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    suffix?: string | ReactElement<any>;
    wrapClassName?: string;
}

const Input: FC<Props> = ({ className = '', status, value, suffix, wrapClassName, ...rest }) => {

    const [internalValue, setInternalValue] = useState(value);
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInternalValue(value);
        rest.onChange?.(e);
    }

    return (
        <div className={
            `w-full relative flex rounded border bg-slate-100 border-slate-900/10 dark:border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? '!border-rose-700' : ''} `
            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
            + `${status && status === 'success' ? '!border-green-700' : ''} `
            + `${wrapClassName} `
        }>
            <input
                {...rest}
                onChange={onValueChange}
                value={orElseEmptyString(internalValue)}
                className={
                    'w-full outline-none px-4 py-2 text-sm bg-transparent placeholder:text-gray-500 rounded-l '
                    + className
                }
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
