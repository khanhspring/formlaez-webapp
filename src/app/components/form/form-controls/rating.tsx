import * as _ from "lodash";
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: string | number;
}

const Rating: FC<Props> = ({ className = '', status, onChange, value, ...rest }) => {

    const options: number[] = _.range(1, 6);

    const onClick = (val: number) => {
        if (value === val) {
            onChange?.(undefined);
            return;
        }
        onChange?.(val);
    }

    return (
        <div className="relative w-full flex items-center gap-2 text-3xl justify-center text-gray-200">
            {
                options.map((val, index) => (
                    <span
                        onClick={() => onClick(val)}
                        key={index}
                        className={
                            `rounded flex items-center justify-center cursor-pointer text transition `
                            + `${status && status === 'error' ? '!border-rose-700' : ''} `
                            + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                            + `${status && status === 'success' ? '!border-green-700' : ''} `

                            + `${val === value ? '' : ''} `
                        }
                    >
                        {
                            (!value || val > +(value || 0)) &&
                            <StarOutlineIcon className="w-10 h-10 cursor-pointer text-slate-900 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200 transition"/>
                        }
                        {
                            (val <= +(value || 0)) &&
                            <StarIcon className="w-10 h-10 cursor-pointer text-yellow-400 hover:text-yellow-600 transition"/>
                        }
                    </span>
                ))
            }
        </div>
    );
}

export default Rating;
