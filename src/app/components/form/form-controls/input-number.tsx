import RcInputNumber from 'rc-input-number';
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: string | number;
    disabled?: boolean;
}

const InputNumber: FC<Props> = ({ className = '', status, onChange = () => {}, value, disabled, ...rest }) => {

    return (
        <div className={
            `w-full relative flex rounded border bg-slate-100 border-slate-900/10 dark:border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? '!border-rose-700' : ''} `
            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
            + `${status && status === 'success' ? '!border-green-700' : ''} `
        }>
            <RcInputNumber
                value={value}
                onChange={onChange}
                className="w-full rounded border-none bg-transparent h-auto outline-none shadow-none text-sm min-h-[36px]"
                placeholder={rest.placeholder}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                disabled={disabled}
            />
        </div>
    );
}

export default InputNumber;
