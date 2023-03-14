import { FC, ReactNode } from 'react';

const heartIcon = (<i className="fi fi-sr-heart"></i>)

type Props = {
    title: ReactNode;
    actions: ReactNode;
    shortTitle?: ReactNode;
}

const PageTitle: FC<Props> = ({title, actions, shortTitle = heartIcon}) => {

    return (
        <div className="py-2 border-b bg-white dark:bg-cinder-900 border-slate-900/10 dark:border-cinder-600 z-20 sticky top-[64px] flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full transition group-hover:ring-2 text-white">
                    <span className="font-semibold flex justify-center items-center">{shortTitle}</span>
                </div>
                <h2 className="font-semibold text-lg">{title}</h2>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs transition">
                {actions}
            </div>
        </div>
    )
}

export default PageTitle;