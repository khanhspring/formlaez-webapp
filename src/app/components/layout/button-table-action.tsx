import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
    onClick?: () => void;
    title?: string;
    danger?: boolean;
    disabled?: boolean;
}

const ButtonTableAction: FC<Props> = ({ title, onClick, danger, disabled, children }) => {
    return (
        <button
            onClick={!disabled ? onClick : undefined}
            title={title}
            className={
                `w-[22px] h-[22px] rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-900/10 dark:border-transparent dark:bg-cinder-700/70 dark:hover:bg-cinder-700 flex items-center justify-center dark:text-gray-500 dark:hover:text-white`
                + ` ${danger ? 'text-rose-700 hover:text-white hover:bg-rose-700 dark:text-rose-700 dark:hover:text-white dark:hover:bg-rose-700' : ''}`
                + ` ${disabled ? 'cursor-not-allowed opacity-80' : ''}`
            }
        >
            {children}
        </button>
    )
}

export default ButtonTableAction;