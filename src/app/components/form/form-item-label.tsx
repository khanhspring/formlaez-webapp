import { FC } from "react";

type Props = {
    content?: string;
    required?: boolean;
}

const FormItemLabel: FC<Props> = ({ content, required }) => {

    if (!content) {
        return <></>
    }

    return (
        <div className="text-sm mb-1 flex gap-1 items-center">
            {required && <span className="text-rose-700 text-lg leading-3 pt-1.5">*</span>}
            <span>{content}</span>
        </div>
    );
}

export default FormItemLabel;