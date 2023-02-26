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
            {
                required &&
                <span className="text-rose-700 text-lg leading-3 pt-1.5 w-3.5 h-3.5 bg-cinder-700/70 rounded-full flex items-center justify-center">
                    *
                </span>
            }
            <span>{content}</span>
        </div>
    );
}

export default FormItemLabel;