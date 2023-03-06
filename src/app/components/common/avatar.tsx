import { FC, HTMLAttributes } from 'react';

const COLORS = ['bg-slate-600', 'bg-gray-600', 'bg-zinc-600', 'bg-neutral-600', 'bg-stone-600', 'bg-red-600', 'bg-orange-600', 'bg-amber-600', 'bg-yellow-600', 'bg-lime-600', 'bg-green-600', 'bg-emerald-600', 'bg-teal-600', 'bg-cyan-600', 'bg-sky-600', 'bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-purple-600', 'bg-fuchsia-600', 'bg-pink-600', 'bg-rose-600']

type Props = HTMLAttributes<any> & {
    name: string;
}

const Avatar: FC<Props> = ({name, className}) => {

    let shortName = name;
    if (shortName.length > 2) {
        shortName = shortName.substring(0, 2);
    }
    shortName = shortName || 'U';

    let colorIndex = shortName.charCodeAt(0) % COLORS.length;
    const color = COLORS[colorIndex];

    return (
        <div className={`rounded-full w-10 h-10 transition cursor-pointer ${color} hover:ring-1 ring-sky-500 font-bold ${className}`}>
            <span className="flex w-full h-full items-center justify-center text-white">{shortName || 'U'}</span>
        </div>
    );
}

export default Avatar;
