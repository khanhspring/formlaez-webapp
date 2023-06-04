import { FC } from "react";

type Props = {
}

const BreakLine: FC<Props> = ({ }) => {

    return (
        <div className="w-full pt-3 pb-7">
            <hr className="hr-wave"/>
        </div>
    );
}

export default BreakLine;
