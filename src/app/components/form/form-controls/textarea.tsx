import * as _ from "lodash";
import { FC, RefObject, TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import useAutoSizeTextarea from "../../../hooks/useAutoSizeTextarea";
import { orElseEmptyString } from "../../../util/common";
import { FieldStatus } from "../form-types";

type Props = TextareaHTMLAttributes<any> & {
    status?: FieldStatus;
    container?: RefObject<any>;
    autoHeight?: boolean;
    autoWidth?: boolean;
    autoSize?: boolean;
    maxWidth?: number;
    rows?: number;
    value?: string;
}

const Textarea: FC<Props> = ({
    className = '',
    status,
    value,
    container,
    autoHeight = false,
    autoWidth = false,
    autoSize = false,
    maxWidth,
    rows = 1,
    ...rest
}) => {

    const ref = useRef<HTMLTextAreaElement>(null);
    const [current, setCurrent] = useState<HTMLTextAreaElement | null>();
    useAutoSizeTextarea(current, { container, maxWidth, autoHeight: autoHeight || autoSize, autoWidth: autoWidth || autoSize });

    useEffect(() => {
        setCurrent(ref.current);
    }, [])

    return (
        <textarea
            {...rest}
            ref={ref}
            onChange={rest.onChange}
            rows={rows}
            value={orElseEmptyString(value)}
            className={
                'border bg-white border-slate-900/10 dark:border-steel-gray-800 dark:bg-steel-gray-900 dark:hover:border-steel-gray-700 shadow-sm rounded outline-none px-4 py-2 resize-none placeholder:text-gray-400 '
                + `${status && status === 'error' ? '!border-rose-700' : ''} `
                + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                + `${status && status === 'success' ? '!border-green-700' : ''} `
                + `${className} `
            }
        />
    );
}

export default Textarea;
