import { FC, PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren & {
    className?: string;
    status?: 'primary' | 'secondary' | 'danger' | 'warning';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({ className, status = 'primary', onClick = () => {}, children }) => {

    const [pressing, setPressing] = useState(false);

    return (
        <button
            onMouseDown={() => setPressing(true)}
            onMouseUp={() => setPressing(false)}
            onClick={onClick}
            className={
                'px-2.5 py-1.5 rounded  text-sm transition flex gap-1'
                + ` ${status === 'primary' ? ' bg-blue-700 hover:bg-blue-600' : ''}`
                + ` ${pressing && status === 'primary' ? ' !bg-blue-700 ring-2 ring-blue-700/50' : ''}`

                + ` ${status === 'secondary' ? ' bg-cinder-900 hover:bg-cinder-700' : ''}`
                + ` ${pressing && status === 'secondary' ? ' !bg-cinder-900 ring-2 ring-cinder-900/50' : ''}`

                + ` ${status === 'danger' ? ' bg-rose-700 hover:bg-rose-500' : ''}`
                + ` ${pressing && status === 'danger' ? ' !bg-rose-700 ring-2 ring-rose-700/50' : ''}`

                + ` ${status === 'warning' ? ' bg-yellow-600 hover:bg-yellow-400' : ''}`
                + ` ${pressing && status === 'warning' ? ' !bg-yellow-600 ring-2 ring-yellow-600/50' : ''}`

                + ` ${className}`
            }
        >
            {children}
        </button>
    );
}

export default Button;
