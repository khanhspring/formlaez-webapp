import { FC, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren & {
    onClick?: () => void;
}

const ButtonAction: FC<Props> = ({ onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center w-7 h-7 text-gray-500 bg-slate-50 dark:text-gray-400 hover:bg-slate-100 dark:bg-cinder-600 rounded dark:hover:text-gray-200"
        >
            {children}
        </button>
    )
}

export default ButtonAction;