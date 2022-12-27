import { FC } from 'react';

type Props = {
    favorite?: boolean;
}

const FormItem: FC<Props> = ({ favorite }) => {
    return (
        <div className="flex items-center p-2 rounded-md dark:bg-cinder-700 relative group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full group-hover:ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 transition">
                <span className="font-bold text-lg">C</span>
            </div>
            <div className="flex-1 flex gap-1 flex-col px-2 overflow-hidden ml-0.5">
                <h3 className="text-sm overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
                    Current sprint requires stakeholders
                </h3>
                <div className="flex items-center gap-1 text-gray-500">
                    <i className="fi fi-rr-clock text-xs"></i>
                    <span className="text-xs">17/12/2022 10:12</span>
                </div>
            </div>
            <span className={`absolute bottom-[-10px] right-0 w-5 h-5 flex items-center justify-center rounded-full bg-gray-400 dark:bg-gray-700 px-1 group-hover:flex ${favorite ? '' : 'hidden'}`}>
                <i className={`fi fi-sr-heart text-xs leading-5 ${favorite ? 'text-rose-600' : ''}`}></i>
            </span>
        </div>
    );
}

export default FormItem;
