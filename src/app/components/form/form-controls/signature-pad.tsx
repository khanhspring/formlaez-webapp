import Tooltip from "rc-tooltip";
import { FC, InputHTMLAttributes, useRef, useEffect } from "react";
import SignatureCanvas from 'react-signature-canvas';
import { FieldStatus } from "../form-types";

type Props = InputHTMLAttributes<any> & {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: string;
}

const SignaturePad: FC<Props> = ({ className = '', status, value, onChange, ...rest }) => {

    const ref = useRef<SignatureCanvas>(null);

    useEffect(() => {
        if (value) {
            ref.current?.fromDataURL(value, { ratio: 1 })
        }
    }, [])

    const onEnd = () => {
        onChange?.(ref.current?.toDataURL());
    }

    const onClear = () => {
        onChange?.(undefined);
        ref.current?.clear();
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className={
                `relative flex rounded border  `
                + `${status && status === 'error' ? '!border-rose-700' : ''} `
                + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                + `${status && status === 'success' ? '!border-green-700' : ''} `
            }>
                <SignatureCanvas
                    ref={ref}
                    penColor='black'
                    canvasProps={{ width: 350, height: 250, className: 'bg-white' }}
                    maxWidth={2}
                    minWidth={1}
                    minDistance={0}
                    onEnd={onEnd}
                    throttle={0}
                />
                <div className="absolute bottom-0 right-0">
                    <Tooltip overlay="Clear" placement="bottom">
                        <span
                            onClick={onClear}
                            className="flex items-center justify-center px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded cursor-pointer transition opacity-80 hover:opacity-100"
                        >
                            <i className="fi fi-rr-broom"></i>
                        </span>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default SignaturePad;
