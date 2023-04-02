import Tooltip from 'rc-tooltip';
import { FC, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren & {
    onClick?: () => void;
    title?: string;
    danger?: boolean;
    disabled?: boolean;
    disabledTooltip?: ReactNode;
}

const ButtonTableAction: FC<Props> = ({ title, onClick, danger, disabled, disabledTooltip, children }) => {

    const buttonInner = (
        <button
            onClick={!disabled ? onClick : undefined}
            title={title}
            className={
                `w-[22px] h-[22px] rounded-full bg-slate-100 border border-slate-900/10 dark:border-transparent dark:bg-gray-600/70 dark:hover:bg-gray-600 flex items-center justify-center dark:text-gray-400`
                + ` ${danger ? 'text-rose-700 dark:text-rose-700' : ''}`
                + ` ${danger && !disabled ? 'hover:text-white hover:bg-rose-700 dark:hover:text-white dark:hover:bg-rose-700' : ''}`
                + ` ${disabled ? 'cursor-not-allowed opacity-80' : 'hover:bg-slate-200 dark:hover:text-white'}`
            }
        >
            {children}
        </button>
    )

    if (!disabled) {
        return (
            <>
                {buttonInner}
            </>
        )
    }

    return (
        <Tooltip overlay={disabledTooltip} placement="bottom">
            {buttonInner}
        </Tooltip>
    )
}

export default ButtonTableAction;