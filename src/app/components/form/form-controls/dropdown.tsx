import Select from 'rc-select';
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

type OptionType = {
    label?: React.ReactNode;
    value?: string | number | null;
    [key: string]: any
}

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    options?: OptionType[];
}

const Dropdown: FC<Props> = ({ status, onChange = () => { }, value, options = [], ...rest }) => {

    return (
        <div className={
            `w-full relative flex rounded border bg-slate-100 border-slate-900/10 dark:border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? 'border-rose-700' : ''} `
            + `${status && status === 'warning' ? 'border-yellow-700' : ''} `
            + `${status && status === 'success' ? 'border-green-700' : ''} `
        }>
            <Select<any, any>
                onChange={onChange}
                className="w-full text-sm rounded"
                allowClear
                showArrow
                showSearch
                placeholder={rest.placeholder}
                inputIcon={<i className="fi fi-sr-angle-small-down text-md" />}
                clearIcon={<i className="fi fi-sr-cross-small text-[16px]" />}
                options={options}
            >
            </Select>
        </div>
    );
}

export default Dropdown;
