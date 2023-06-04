import { FC } from "react";

type Props = {
}

const BreakLine: FC<Props> = ({ }) => {

    return (
        <div className="w-full pt-1 pb-3">
            <hr className="max-w-[200px] ml-0 hr-wave" />
        </div>
    );
}

export default BreakLine;
