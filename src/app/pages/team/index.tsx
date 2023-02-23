import { useState } from 'react';
import { Link } from 'react-router-dom';
import TeamItem from '../../components/common/team-item';
import CreateTeamModal from './create-team-modal';

function Team() {

    const [createModalVisible, setCreateModelVisible] = useState(false);

    const showCreateModal = () => {
        setCreateModelVisible(true);
    }

    const closeCreateModal = () => {
        setCreateModelVisible(false);
    }

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between min-h-[40px]">
                    <div className="flex items-center gap-3">
                        <span>Total 7</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition"
                            onClick={showCreateModal}
                        >
                            <i className="fi fi-rr-plus"></i>
                            <span className="hidden">Add new</span>
                        </button>
                        <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                            <i className="fi fi-rr-heart"></i>
                            <span className="hidden">Favorite</span>
                        </button>
                        <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                            <i className="fi fi-rr-apps"></i>
                            <span className="hidden">Grid</span>
                        </button>
                        <button className="flex items-center justify-center w-7 h-7 text-gray-400 dark:bg-cinder-600 rounded dark:hover:text-gray-200 transition">
                            <i className="fi fi-rr-menu-burger"></i>
                            <span className="hidden">List</span>
                        </button>
                    </div>
                </div>
                <div className="grid gap-5 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
                    <Link to="/teams/vuejs-team">
                        <TeamItem />
                    </Link>
                    <Link to="/teams/vuejs-team">
                        <TeamItem favorite={true} />
                    </Link>
                    <Link to="/teams/vuejs-team">
                        <TeamItem />
                    </Link>
                    <Link to="/teams/vuejs-team">
                        <TeamItem />
                    </Link>
                    <Link to="/teams/vuejs-team">
                        <TeamItem favorite={true} />
                    </Link>
                    <Link to="/teams/vuejs-team">
                        <TeamItem />
                    </Link>
                    <Link to="/teams/vuejs-team">
                        <TeamItem />
                    </Link>
                    <Link to="/teams/vuejs-team">
                        <TeamItem />
                    </Link>
                </div>
            </div>
            <CreateTeamModal
                visible={createModalVisible}
                onClose={closeCreateModal}
            />
        </>
    );
}

export default Team;
