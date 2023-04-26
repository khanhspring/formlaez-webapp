import { FC, HTMLAttributes } from 'react';

type Props = HTMLAttributes<any> & {
    name: string;
}

const SidebarAvatar: FC<Props> = ({ name, className, onClick }) => {

    let shortName = name;
    if (shortName.length > 2) {
        shortName = shortName.substring(0, 2);
    }
    shortName = shortName || 'U';

    return (
        <div
            onClick={onClick}
            className={`rounded w-9 h-9 transition cursor-pointer hover:ring-1 ring-teal-700 font-bold bg-gradient-to-r from-cyan-400 to-lime-400 ${className}`}
        >
            <span className="flex w-full h-full items-center justify-center text-white">{shortName || 'U'}</span>
        </div>
    );
}

export default SidebarAvatar;
