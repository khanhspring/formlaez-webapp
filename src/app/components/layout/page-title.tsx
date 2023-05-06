import { FC, ReactNode } from 'react';

const defaultIcon = (<i className="fi fi-rr-circle-small"></i>)

type Props = {
    title: ReactNode;
    actions: ReactNode;
    shortTitle?: ReactNode;
    className?: string;
    iconClassName?: string;
    prefix?: ReactNode;
}

const PageTitle: FC<Props> = ({ title, actions, shortTitle = defaultIcon, className, iconClassName, prefix }) => {

    return (
        <div className={
            "w-full max-w-full overflow-hidden py-2 border-b border-slate-900/10 dark:border-steel-gray-900 z-20 sticky top-[64px] flex items-center justify-between gap-10 dark:bg-steel-gray-950"
            + ` ${className}`
        }>
            <div className="flex items-center gap-2 overflow-hidden">
                <div className='flex items-center gap-2'>
                    {prefix}
                    <div className={
                        "flex items-center justify-center w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition group-hover:ring-2 text-white"
                        + ` ${iconClassName}`
                    }>
                        <span className="font-semibold flex justify-center items-center">{shortTitle}</span>
                    </div>
                </div>
                <div className="font-semibold text-lg overflow-hidden">{title}</div>
            </div>
            <div className="flex-1 flex items-center justify-end gap-3 text-xs transition">
                {actions}
            </div>
        </div>
    )
}

export default PageTitle;