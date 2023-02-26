import * as _ from "lodash";
import { FC, RefObject, TextareaHTMLAttributes, useRef } from "react";
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
    useAutoSizeTextarea(ref, { container, maxWidth, autoHeight: autoHeight || autoSize, autoWidth: autoWidth || autoSize });

    return (
        <textarea
            {...rest}
            ref={ref}
            onChange={rest.onChange}
            rows={rows}
            value={orElseEmptyString(value)}
            className={
                'border  dark:bg-cinder-700 rounded outline-none px-4 py-2 text-sm resize-none placeholder:text-gray-500 '
                + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
                + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
                + `${status && status === 'success' ? 'dark:border-green-700' : ''} `
                + `${!status || _.isEmpty(status) ? 'dark:border-cinder-600' : ''} `
                + `${className} `
            }
        />
    );
}

export default Textarea;
