import * as _ from "lodash";
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

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

const MultipleChoice: FC<Props> = ({ className = '', status, onChange, value, options = [], multipleSelection }) => {

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
                            `rounded border bg-white border-slate-900/10 hover:bg-slate-200 dark:border-steel-gray-800 dark:bg-steel-gray-900 cursor-pointer dark:hover:bg-steel-gray-700 px-2.5 py-1 w-auto text-base transition `
                            + `${status && status === 'error' ? '!border-rose-700' : ''} `
                            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                            + `${status && status === 'success' ? '!border-green-700' : ''} `

                            + `${_.includes(value, item?.value) ? '!bg-blue-700 !border-blue-700 text-white' : ''} `
                        }
                    >
                        {item?.label}
                    </span>
                ))
            }
        </div>
    );
}

export default MultipleChoice;
