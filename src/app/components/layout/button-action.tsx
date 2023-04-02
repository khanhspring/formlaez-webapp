import { FC, HTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren & HTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    disabled?: boolean;
    shape?: 'circle' | 'rounded'
}

const ButtonAction: FC<Props> = ({ onClick, disabled, children, shape = 'rounded', ...rest }) => {
    return (
        <button
            {...rest}
            onClick={!disabled ? onClick : undefined}
            className={
                `flex items-center justify-center min-w-[28px] h-7 bg-slate-200 dark:text-white hover:bg-slate-100 dark:bg-slate-600 rounded dark:hover:text-gray-200`
                + ` ${disabled ? 'cursor-not-allowed text-slate-900/50 dark:!text-gray-500' : ''}`
                + ` ${shape === 'circle' ? '!rounded-full' : ''}`
            }
        >
            {children}
        </button>
    )
}

export default ButtonAction;