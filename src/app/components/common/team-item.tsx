import { FC } from 'react';
import { Team } from '../../models/team';
import AvatarGroup from './avatar-group';

type Props = {
    team: Team;
}

const TeamItem: FC<Props> = ({ team }) => {

    const members = team.members?.map(m => m.user.firstName + ' ' + m.user.lastName)

    return (
        <div className="flex flex-col gap-2 h-full px-7 pt-10 pb-7 rounded-md border border-slate-900/10 bg-zinc-50 dark:border-steel-gray-900 dark:bg-steel-gray-900 dark:hover:bg-steel-gray-800 transition relative group">
            <div className="flex flex-col gap-2.5">
                <div className='flex items-center justify-center w-8 h-8 rounded-full ring-1 ring-teal-500/50 p-0.5'>
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-white transition group-hover:ring-2 ring-teal-500/50">
                        <span className="font-semibold rounded-full">H</span>
                    </div>
                </div>
                <h3 className="font-normal">
                    {team.name}
                </h3>
            </div>
            <div className="text-sm text-slate-600 dark:text-gray-400 font-light">
                {
                    team.description &&
                    <p className='overflow-hidden whitespace-nowrap text-ellipsis'>{team.description}</p>
                }
                {
                    !team.description &&
                    <p className='opacity-70'>No description</p>
                }
            </div>
            <div className="mt-auto pt-2 flex justify-between items-center">
                <AvatarGroup className="w-6 h-6 text-xs font-normal" users={members} />
                <span className='flex justify-between items-center opacity-80 text-xs font-light'>
                    {members?.length || 0} member{members && members.length > 1 ? 's' : ''}
                </span>
            </div>
        </div>
    );
}

export default TeamItem;
