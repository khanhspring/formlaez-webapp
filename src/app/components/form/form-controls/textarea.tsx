import { ChangeEvent, FC, ReactElement, RefObject, TextareaHTMLAttributes, useRef, useState } from "react";
import useAutoSizeTextarea from "../../../hooks/useAutoSizeTextarea";
import { orElseEmptyString } from "../../../util/common";
import { FieldStatus } from "../form-types";

type Props = TextareaHTMLAttributes<any> & {
    prefix?: string | ReactElement;
    status?: FieldStatus;
    container?: RefObject<any>;
    autoHeight?: boolean;
    autoWidth?: boolean;
    autoSize?: boolean;
    maxWidth?: number;
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
    ...rest
}) => {

    const [internalValue, setInternalValue] = useState(value);
    const onValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInternalValue(value);
        rest.onChange?.(e);
    }

    const ref = useRef<HTMLTextAreaElement>(null);
    useAutoSizeTextarea(ref, { container, maxWidth, autoHeight: autoHeight || autoSize, autoWidth: autoWidth || autoSize });

    return (
        <textarea
            {...rest}
            onChange={onValueChange}
            ref={ref}
            rows={1}
            value={orElseEmptyString(internalValue)}
            className={
                'rounded outline-none px-4 py-2 text-sm border-none resize-none dark:bg-cinder-700 placeholder:text-gray-500'
                + `${status && status === 'error' ? 'dark:border-rose-700' : ''} `
                + `${status && status === 'warning' ? 'dark:border-yellow-700' : ''} `
                + `${status && status === 'success' ? 'dark:border-green-700' : ''} `
                + className
            }
        />
    );
}

export default Textarea;
