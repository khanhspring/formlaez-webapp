import * as _ from "lodash";
import { FC, InputHTMLAttributes } from "react";
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: string | number;
}

const Rating: FC<Props> = ({ className = '', status, onChange, value, ...rest }) => {

    const options = _.range(1, 6);

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
                            + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
                            + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
                            + `${status && status === 'success' ? 'dark:border-green-700' : ''} `

                            + `${val === value ? '' : ''} `
                        }
                    >
                        {
                            (!value || val > (value || 0)) &&
                            <i className="fi fi-rs-star cursor-pointer text-gray-400 hover:text-gray-200 transition"></i>
                        }
                        {
                            (val <= (value || 0)) &&
                            <i className="fi fi-ss-star cursor-pointer text-yellow-400 hover:text-yellow-600 transition"></i>
                        }
                    </span>
                ))
            }
        </div>
    );
}

export default Rating;
