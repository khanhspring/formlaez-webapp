import * as _ from "lodash";
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: string | number;
}

const OpinionScale: FC<Props> = ({ className = '', status, onChange, value, ...rest }) => {

    const options = _.range(0, 11);

    const onClick = (val: number) => {
        if (value === val) {
            onChange?.(undefined);
            return;
        }
        onChange?.(val);
    }

    return (
        <div className="w-full relative flex gap-2">
            {
                options.map((val, index) => (
                    <span
                        onClick={() => onClick(val)}
                        key={index}
                        className={
                            `rounded border bg-slate-100 border-slate-900/10 hover:bg-slate-200 dark:border-gray-700 dark:bg-gray-800 flex-1 h-10 flex items-center justify-center cursor-pointer dark:hover:bg-gray-700 transition `
                            + `${status && status === 'error' ? '!border-rose-700' : ''} `
                            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                            + `${status && status === 'success' ? '!border-green-700' : ''} `

                            + `${val === value ? '!bg-blue-700 !border-blue-700 text-white' : ''} `
                        }
                    >
                        {val}
                    </span>
                ))
            }
        </div>
    );
}

export default OpinionScale;
