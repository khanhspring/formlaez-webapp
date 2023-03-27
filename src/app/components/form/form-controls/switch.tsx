import RcSwitch from "rc-switch";
import { FC, useEffect } from "react";
import { FieldStatus } from "../form-types";

type Props = {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: any;
}

const Switch: FC<Props> = ({ status, onChange = () => {}, value = false, ...rest }) => {

    useEffect(() => {
        onChange?.(value);
    }, []);

    return (
        <RcSwitch
            className={
                `${status && status === 'error' ? '!border-rose-700' : ''} `
                + `${status && status === 'warning' ? '!border-yellow-700' : ''} `
                + `${status && status === 'success' ? '!border-green-700' : ''} `
            }
            checked={value}
            onChange={onChange}
        />
    );
}

export default Switch;
