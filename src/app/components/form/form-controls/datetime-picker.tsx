import type { Moment } from 'moment';
import Picker from 'rc-picker';
import generateConfig from 'rc-picker/lib/generate/moment';
import enUS from 'rc-picker/lib/locale/en_US';
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value: any) => void;
    showTime?: boolean;
}

const DatetimePicker: FC<Props> = ({ className = '', status, value, showTime, ...rest }) => {

    const onValueChange = (value: Moment | null, dateString: string) => {
        rest.onChange?.(dateString);
    }

    let format = "YYYY-MM-DD";
    if (showTime) {
        format = "YYYY-MM-DD HH:mm";
    }

    return (
        <div className={
            `w-full relative flex rounded border bg-slate-100 border-slate-900/10 dark:border-cinder-600 dark:bg-cinder-700 `
            + `${status && status === 'error' ? '!border-rose-700' : ''} `
            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
            + `${status && status === 'success' ? '!border-green-700' : ''} `
        }>
            <Picker<Moment>
                format={format}
                onChange={onValueChange}
                generateConfig={generateConfig}
                locale={enUS}
                showTime={showTime && {
                    format: 'HH:mm',
                    showSecond: false
                }}
                suffixIcon={<i className="fi fi-rr-calendar text-md"></i>}
                placeholder={rest.placeholder}
                className="w-full border-none text-sm px-4 py-2"
                allowClear
                clearIcon={<i className="fi fi-rr-cross-small text-[16px]"></i>}
                dropdownClassName="shadow bg-slate-100 dark:bg-cinder-800"
                nextIcon={<i className="fi fi-rr-angle-small-right text-md"></i>}
                superNextIcon={<i className="fi fi-rr-angle-double-small-right text-md"></i>}
                prevIcon={<i className="fi fi-rr-angle-small-left text-md"></i>}
                superPrevIcon={<i className="fi fi-rr-angle-double-small-left text-md"></i>}
            />
        </div>
    );
}

export default DatetimePicker;
