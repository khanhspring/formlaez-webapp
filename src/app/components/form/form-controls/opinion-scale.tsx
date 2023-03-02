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
                            `rounded border border-cinder-600 bg-cinder-700 flex-1 h-9 flex items-center justify-center cursor-pointer hover:bg-cinder-600 transition `
                            + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
                            + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
                            + `${status && status === 'success' ? 'dark:border-green-700' : ''} `

                            + `${val === value ? '!bg-blue-700 !border-blue-700' : ''} `
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