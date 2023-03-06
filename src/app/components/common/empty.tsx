import { FC } from 'react';
import EmptyIcon from "../icons/empty-icon";

type Props = {
    description?: string;
}

const Empty: FC<Props> = ({ description }) => {
    return (
        <div className="w-full flex flex-col gap-2 items-center justify-center py-10">
            <EmptyIcon className="fill-white w-24" />
            {
                description &&
                <p className="text-sm text-slate-900 dark:text-slate-300">{description}</p>
            }
        </div>
    );
}

export default Empty;
