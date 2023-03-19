import { FC } from 'react';
import { Team } from '../../models/team';
import AvatarGroup from './avatar-group';

type Props = {
    team: Team;
}

const TeamItem: FC<Props> = ({ team }) => {

    const members = team.members?.map(m => m.user.firstName + ' ' + m.user.lastName)

    return (
        <div className="team-item flex flex-col gap-2 h-full p-3 rounded-md bg-slate-50 border border-slate-900/10 dark:border-transparent dark:bg-cinder-700 relative group">
            <div className="flex items-center gap-1.5">
                <div className="flex items-center justify-center w-6 h-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-white transition group-hover:ring-2 ring-teal-500/50">
                    <span className="font-semibold">H</span>
                </div>
                <h3 className="font-normal">
                    {team.name}
                </h3>
            </div>
            <div className="text-sm text-slate-600 dark:text-gray-400 font-light">
                {
                    team.description &&
                    <p>{team.description}</p>
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
