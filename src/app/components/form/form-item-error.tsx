import { Meta } from "rc-field-form/lib/interface";
import { FC } from "react";

type Props = {
    meta?: Meta;
    help?: string;
}

const FormItemError: FC<Props> = ({ meta, help }) => {

    if (!meta) {
        return <></>
    }

    const [error] = meta.errors || [];

    return (
        <div className="min-h-[20px] flex flex-col">
            <p className="text-[13px] text-rose-700 leading-5">{error}</p>
            {help && <span className="text-xs font-light opacity-70 inline-block mb-3">{help}</span>}
        </div>
    );
}

export default FormItemError;