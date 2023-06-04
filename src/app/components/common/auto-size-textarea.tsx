import { FC, RefObject, TextareaHTMLAttributes, useEffect, useRef, useState } from "react";
import useAutoSizeTextarea from "../../hooks/useAutoSizeTextarea";

type Props = TextareaHTMLAttributes<any> & {
    autoHeight?: boolean;
    autoWidth?: boolean;
    autoSize?: boolean;
    autoFocus?: boolean;
    container?: RefObject<any>;
    maxWidth?: number;
}

const AutoSizeTextarea: FC<Props> = ({ container, maxWidth, autoHeight, autoSize, autoWidth, autoFocus, ...rest }) => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const [current, setCurrent] = useState<HTMLTextAreaElement | null>();
    useAutoSizeTextarea(current, { container, maxWidth, autoHeight: autoHeight || autoSize, autoWidth: autoWidth || autoSize });

    useEffect(() => {
        setCurrent(ref.current);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (autoFocus && current) {
                current.focus();
            }
        }, 200)
    }, [autoFocus, current])

    return (
        <textarea
            {...rest}
            ref={ref}
        />
    )
}

export default AutoSizeTextarea;