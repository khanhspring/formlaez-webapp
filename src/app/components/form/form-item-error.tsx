import { Meta } from "rc-field-form/lib/interface";
import { FC } from "react";

type Props = {
    meta?: Meta;
}

const FormItemError: FC<Props> = ({ meta }) => {

    if (!meta) {
        return <></>
    }

    const [error] = meta.errors || [];

    return (
        <div className="min-h-[20px]">
            <p className="text-[13px] text-rose-700 leading-5">{error}</p>
        </div>
    );
}

export default FormItemError;