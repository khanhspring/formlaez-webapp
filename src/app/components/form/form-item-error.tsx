import { Meta } from "rc-field-form/lib/interface";
import { FC } from "react";

type Props = {
    meta?: Meta;
}

const FormItemError: FC<Props> = ({ meta }) => {

    if (!meta) {
        return <></>
    }

    return (
        <div className="min-h-[22px] mb-0.5">
            {
                meta.errors?.map((item, index) =>
                    <p key={index} className="text-sm text-rose-700 leading-[22px]">{item}</p>
                )
            }
        </div>
    );
}

export default FormItemError;