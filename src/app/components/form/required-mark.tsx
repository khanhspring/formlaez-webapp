import { FC } from 'react';

type Props = {
    visible?: boolean;
}

const RequiredMark: FC<Props> = ({visible}) => {

    if (!visible) {
        return <></>
    }

    return (
        <span className="text-rose-700 text-lg leading-3 w-3.5 h-3.5 bg-slate-100 dark:bg-cinder-700/70 rounded-full flex items-center justify-center pt-1.5 mr-1">*</span>
    )
}

export default RequiredMark;