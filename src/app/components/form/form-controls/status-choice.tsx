import * as _ from "lodash";
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

type OptionType = {
    label?: React.ReactNode;
    value?: string | number | null;
    [key: string]: any
}

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: (string | number)[];
    options?: OptionType[];
    multipleSelection?: boolean;
}

const StatusChoice: FC<Props> = ({ className = '', status, onChange, value, options = [], multipleSelection }) => {

    const onClick = (val: OptionType) => {
        if (_.includes(value, val?.value)) {

            if (!multipleSelection) {
                onChange?.(undefined);
                return;
            }

            const results = [...value || []];
            _.remove(results, item => item === val?.value);
            onChange?.(results);
            return;
        }

        if (!multipleSelection) {
            onChange?.([val?.value]);
            return;
        }

        onChange?.([...value || [], val?.value]);
    }

    return (
        <div className="w-full relative flex flex-col items-start gap-2">
            {
                multipleSelection &&
                <div className="wf-full">
                    <span className="text-xs text-gray-500">(Choose as many as you like)</span>
                </div>
            }
            {
                options.map((item, index) => (
                    <span
                        onClick={() => onClick(item)}
                        key={index}
                        className={
                            `rounded text-white cursor-pointer px-2.5 py-1 w-auto text-base border border-transparent transition `
                            + `${status && status === 'error' ? '!border-rose-700' : ''} `
                            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                            + `${status && status === 'success' ? '!border-green-700' : ''} `
                        }
                        style={options?.[index].bgColor ? { backgroundColor: options?.[index].bgColor } : { backgroundColor: '#697689' }}
                    >
                        <span className="flex items-center justify-center gap-1">
                            {item?.label || 'Unlabeled status'}
                            {
                                _.includes(value, item?.value) &&
                                <CheckCircleIcon className="w-5 h-5 text-white -mr-1" />
                            }
                        </span>
                    </span>
                ))
            }
        </div>
    );
}

export default StatusChoice;
