import * as _ from 'lodash';
import RcDrawer, { DrawerProps } from 'rc-drawer';
import { FC, PropsWithChildren, ReactNode } from 'react';
import motionProps from './motion';

type Props = DrawerProps & PropsWithChildren & {
    title?: ReactNode;
    closeIcon?: ReactNode;
}

const Drawer: FC<Props> = ({ title, closeIcon, children, ...rest }) => {

    const closeButton = () => {
        if (_.isNil(closeIcon) || closeIcon === true) {
            return (
                <button className='p-1 flex items-center text-slate-800 hover:text-slate-500 dark:text-gray-500 dark:hover:text-white' onClick={rest.onClose}>
                    <i className="fi fi-rr-cross-small text-xl"></i>
                    <span className='hidden'>Close</span>
                </button>
            )
        }

        if (closeIcon) {
            return (
                <button className='p-1 flex items-center text-gray-500 hover:text-white' onClick={rest.onClose}>
                    {closeIcon}
                </button>
            )
        }
    }

    const hideHeader = !_.isNil(closeIcon) && !closeIcon && !title;

    return (
        <RcDrawer
            {...rest}
            {...motionProps}
            className="dark:bg-gray-800"
        >
            {
                !hideHeader &&
                <div className="flex items-center gap-2 p-3">
                    <>
                        {closeButton()}
                        <div className="flex-1 font-bold">
                            {title}
                        </div>
                    </>
                </div>
            }
            <div className="px-5 py-2">
                {children}
            </div>
        </RcDrawer>
    );
};
export default Drawer;