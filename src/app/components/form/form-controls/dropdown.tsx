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
            `w-full relative flex rounded border border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
            + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
            + `${status && status === 'success' ? 'dark:border-green-700' : ''} `
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
