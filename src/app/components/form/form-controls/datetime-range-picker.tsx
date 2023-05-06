import type { Moment } from 'moment';
import moment from 'moment';
import { RangePicker } from 'rc-picker';
import generateConfig from 'rc-picker/lib/generate/moment';
import enUS from 'rc-picker/lib/locale/en_US';
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value: any) => void;
    showTime?: boolean;
    value?: string;
    placeholder?: [string, string];
    className?: string
}

const DatetimeRangePicker: FC<Props> = ({ className = '', status, value, showTime, placeholder, ...rest }) => {

    const onValueChange = (value: Moment | null, dateString: string) => {
        rest.onChange?.(dateString);
    }

    let format = "YYYY-MM-DD";
    if (showTime) {
        format = "YYYY-MM-DD HH:mm";
    }

    let initValue = undefined;
    if (value) {
        initValue = moment(value);
    }

    return (
        <div className={
            `w-full relative flex rounded border bg-white border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 `
            + `${status && status === 'error' ? '!border-rose-700' : ''} `
            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
            + `${status && status === 'success' ? '!border-green-700' : ''} `
        }>
            <RangePicker<Moment>
                format={format}
                generateConfig={generateConfig}
                locale={enUS}
                showTime={showTime && {
                    format: 'HH:mm',
                    showSecond: false
                }}
                suffixIcon={<i className="fi fi-rr-calendar text-md"></i>}
                placeholder={placeholder}
                className={`w-full border-none text-base py-2 px-4 ${className}`}
                allowClear
                clearIcon={<i className="fi fi-rr-cross-small text-[16px]"></i>}
                dropdownClassName="rounded shadow bg-slate-100 dark:bg-slate-800 z-[1100]"
                nextIcon={<i className="fi fi-rr-angle-small-right text-md"></i>}
                superNextIcon={<i className="fi fi-rr-angle-double-small-right text-md"></i>}
                prevIcon={<i className="fi fi-rr-angle-small-left text-md"></i>}
                superPrevIcon={<i className="fi fi-rr-angle-double-small-left text-md"></i>}
                separator={<i className="fi fi-rr-arrow-right text-md"></i>}
            />
        </div>
    );
}

export default DatetimeRangePicker;
