import { ChangeEvent, FC, InputHTMLAttributes, ReactElement, useState } from "react";
import { numberOrUndefined, orElseEmptyString } from "../../../util/common";
import { FieldStatus } from "../form-types";
import * as _ from "lodash";

type Props = InputHTMLAttributes<any> & {
    prefix?: string | ReactElement;
    status?: FieldStatus;
    onChange?: (value?: any) => void;
}

const InputNumber: FC<Props> = ({ className = '', status, onChange = () => { }, value, min, max, ...rest }) => {

    const [currentNumber, setCurrentNumber] = useState<number | undefined>(numberOrUndefined(value));
    const [internalValue, setInternalValue] = useState(value);

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
    }

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
        if (_.isEmpty(e.target.value)) {
            onChange(undefined);
            return;
        }

        const value = numberOrUndefined(e.target.value);
        if (!value) {
            setInternalValue(currentNumber);
            onChange(currentNumber);
            return;
        }

        if (min && _.isNumber(+min) && max && _.isNumber(+max) && +min > +max) {
            setInternalValue(currentNumber);
            onChange(currentNumber);
            return;
        }

        if (min && _.isNumber(+min) && value < +min) {
            setInternalValue(+min);
            setCurrentNumber(+min);
            onChange(+min);
            return;
        }

        if (max && _.isNumber(+max) && value > +max) {
            setInternalValue(+max);
            setCurrentNumber(+max);
            onChange(+max);
            return;
        }

        setCurrentNumber(value);
        setInternalValue(value);
        onChange(value);
    }

    return (
        <div className="w-full">
            <input
                {...rest}
                value={orElseEmptyString(internalValue)}
                onChange={onValueChange}
                onBlur={onBlur}
                className={
                    'w-full rounded outline-none border h-8 px-2.5 text-sm dark:border-cinder-800 dark:bg-cinder-700 placeholder:text-gray-500'
                    + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
                    + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
                    + `${status && status === 'success' ? 'dark:border-green-700' : ''} `
                    + className
                }
            />
        </div>
    );
}

export default InputNumber;
