import { FC } from 'react';
import AvatarGroup from './avatar-group';
import FavoriteButton from './favorite-button';

type Props = {
    favorite?: boolean;
}

const TeamItem: FC<Props> = ({ favorite }) => {
    return (
        <div className="flex flex-col gap-2 h-full p-3 rounded-md dark:bg-cinder-700 relative group">
            <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full transition group-hover:ring-2">
                    <span className="font-semibold">H</span>
                </div>
                <h3 className="font-normal">Lorem ipsum dolor sit</h3>
            </div>
            <div className="text-sm text-gray-400">
                <p>The development of Vue and its ecosystem is guided by an international team</p>
            </div>
            <div className="mt-auto pt-2">
                <AvatarGroup className="w-6 h-6 text-xs font-normal" />
            </div>
            <FavoriteButton favorite={favorite} className={`absolute bottom-[-10px] right-0 group-hover:flex ${favorite ? '' : 'hidden'}`}/>
        </div>
    );
}

export default TeamItem;
