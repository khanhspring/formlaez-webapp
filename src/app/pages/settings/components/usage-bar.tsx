import { FC, ReactNode } from 'react';

type Props = {
    title: ReactNode;
    maxValue: number;
    used: number;
}

const UsageBar: FC<Props> = ({ title, maxValue, used }) => {

    const percentage = (used * 100 / maxValue).toFixed(0);

    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium">
                    {title}
                </span>
                <span className="text-sm font-medium">
                    {percentage} %
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                <div className="bg-blue-600 h-1 rounded-full" style={{width: `${percentage}%`}}></div>
            </div>

        </div>
    )
}

export default UsageBar;