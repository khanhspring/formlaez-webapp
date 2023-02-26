import RcInputNumber from 'rc-input-number';
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: string | number;
}

const InputNumber: FC<Props> = ({ className = '', status, onChange = () => {}, value, ...rest }) => {

    return (
        <div className={
            `w-full relative flex rounded border border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
            + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
            + `${status && status === 'success' ? 'dark:border-green-700' : ''} `
        }>
            <RcInputNumber
                value={value}
                onChange={onChange}
                className="w-full rounded border-none bg-cinder-700 h-auto outline-none shadow-none text-sm min-h-[36px] text-white"
                placeholder={rest.placeholder}
            />
        </div>
    );
}

export default InputNumber;
