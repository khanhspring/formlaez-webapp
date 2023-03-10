import { FC, HTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren & HTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    disabled?: boolean;
}

const ButtonAction: FC<Props> = ({ onClick, disabled, children, ...rest }) => {
    return (
        <button
            {...rest}
            onClick={!disabled ? onClick : undefined}
            className={
                `flex items-center justify-center w-7 h-7 c bg-slate-200 dark:text-white hover:bg-slate-100 dark:bg-cinder-600 rounded dark:hover:text-gray-200`
                + ` ${disabled ? 'cursor-not-allowed text-slate-900/50 dark:!text-gray-500' : ''}`
            }
        >
            {children}
        </button>
    )
}

export default ButtonAction;