import Select from 'rc-select';
import { FC, InputHTMLAttributes, ReactNode } from "react";
import { FieldStatus } from "../form-types";
import { CheckIcon } from '@heroicons/react/24/solid';

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
            `w-full relative flex rounded border bg-white border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 dark:hover:border-steel-gray-700 shadow-sm `
            + `${status && status === 'error' ? '!border-rose-700' : ''} `
            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
            + `${status && status === 'success' ? '!border-green-700' : ''} `
        }>
            <Select<any, any>
                onChange={handleChange}
                value={value}
                className="w-full text-base rounded"
                dropdownClassName='z-[1100]'
                allowClear={allowClear}
                showArrow
                showSearch
                placeholder={rest.placeholder}
                inputIcon={<i className="fi fi-sr-angle-small-down text-base" />}
                clearIcon={<i className="fi fi-sr-cross-small text-[16px]" />}
                menuItemSelectedIcon={<CheckIcon className='w-5 h-5'/>}
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
