import RcSwitch from "rc-switch";
import { FC } from "react";
import { FieldStatus } from "../form-types";

type Props = {
    status?: FieldStatus;
    onChange?: (value?: any) => void;
    value?: any;
}

const Switch: FC<Props> = ({ status, onChange = () => {}, value, ...rest }) => {


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
