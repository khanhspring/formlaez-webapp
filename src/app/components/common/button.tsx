import React, { PropsWithChildren, useState } from 'react';
import LoadingIcon from '../icons/loading-icon';

type Props = PropsWithChildren & {
    className?: string;
    status?: 'primary' | 'secondary' | 'danger' | 'warning';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    htmlType?: 'submit' | 'reset' | 'button';
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, Props>(({
    className,
    status = 'primary',
    onClick = () => { },
    children,
    htmlType = 'submit',
    loading
}, ref) => {

    const [pressing, setPressing] = useState(false);

    return (
        <button
            onMouseDown={() => !loading && setPressing(true)}
            onMouseUp={() => setPressing(false)}
            onClick={!loading ? onClick : undefined}
            ref={ref}
            className={
                'px-2.5 py-1.5 rounded transition flex justify-center items-center gap-1 dark:text-white'
                + ` ${status === 'primary' ? ' bg-blue-700 hover:bg-blue-600 text-white' : ''}`
                + ` ${pressing && status === 'primary' ? ' !bg-blue-700 ring-2 ring-blue-700/50' : ''}`

                + ` ${status === 'secondary' ? ' bg-slate-200 hover:bg-slate-300 dark:bg-steel-gray-900 dark:hover:bg-steel-gray-800' : ''}`
                + ` ${pressing && status === 'secondary' ? ' dark:!bg-steel-gray-900 ring-2 dark:ring-slate-900/50' : ''}`

                + ` ${status === 'danger' ? ' bg-rose-700 hover:bg-rose-500' : ''}`
                + ` ${pressing && status === 'danger' ? ' !bg-rose-700 ring-2 ring-rose-700/50' : ''}`

                + ` ${status === 'warning' ? ' bg-yellow-600 hover:bg-yellow-400' : ''}`
                + ` ${pressing && status === 'warning' ? ' !bg-yellow-600 ring-2 ring-yellow-600/50' : ''}`

                + ` ${loading ? '!bg-blue-600 cursor-not-allowed' : ''}`

                + ` ${className}`
            }
            type={htmlType}
        >
            {children}
            {
                loading &&
                <div className="ml-1">
                    <LoadingIcon />
                </div>
            }
        </button>
    );
});

export default Button;
