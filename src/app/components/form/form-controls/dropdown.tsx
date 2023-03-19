import Select from 'rc-select';
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { FieldStatus } from "../form-types";

type OptionType = {
    label?: React.ReactNode;
    value?: string | number | null;
    [key: string]: any
}

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    options?: OptionType[];
    value?: string[];
    allowClear?: boolean;
    notFoundContent?: ReactNode;
    onSearch?: (value?: any) => void;
    loading?: boolean;
    filterOption?: boolean;
}

const Dropdown: FC<Props> = ({ status, onChange = () => { }, value, options = [], allowClear, notFoundContent, onSearch, loading, filterOption = true, ...rest }) => {

    const handleChange = (value: any) => {
        onChange?.(value);
    }

    const handleSearch = (value: any) => {
        onSearch?.(value);
    }

    return (
        <div className={
            `w-full relative flex rounded border bg-slate-100 border-slate-900/10 dark:border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? '!border-rose-700' : ''} `
            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
            + `${status && status === 'success' ? '!border-green-700' : ''} `
        }>
            <Select<any, any>
                onChange={handleChange}
                value={value}
                className="w-full text-sm rounded"
                dropdownClassName='z-[1100]'
                allowClear={allowClear}
                showArrow
                showSearch
                placeholder={rest.placeholder}
                inputIcon={<i className="fi fi-sr-angle-small-down text-md" />}
                clearIcon={<i className="fi fi-sr-cross-small text-[16px]" />}
                options={options}
                notFoundContent={notFoundContent}
                onSearch={handleSearch}
                loading={loading}
                filterOption={filterOption}
            >
            </Select>
        </div>
    );
}

export default Dropdown;
