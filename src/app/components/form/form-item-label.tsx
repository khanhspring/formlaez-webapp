import { FC } from "react";
import RequiredMark from "./required-mark";

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
            <RequiredMark visible={required} />
            <span>{content}</span>
        </div>
    );
}

export default FormItemLabel;