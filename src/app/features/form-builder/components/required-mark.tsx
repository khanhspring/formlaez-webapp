import { FC } from 'react';
import AsteriskIcon from '../../../components/icons/asterisk-icon';

type Props = {
    visible?: boolean;
}

const RequiredMark: FC<Props> = ({ visible }) => {

    if (!visible) {
        return <></>
    }

    return (
        <span className="w-3.5 h-3.5 bg-slate-100 dark:bg-slate-700/70 rounded-full flex items-center justify-center mr-1">
            <AsteriskIcon className='fill-rose-700 !w-2 !h-2' />
        </span>
    )
}

export default RequiredMark;