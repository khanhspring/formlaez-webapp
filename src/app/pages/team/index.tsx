import { useState } from 'react';
import { Link } from 'react-router-dom';
import TeamItem from '../../components/common/team-item';
import ButtonAction from '../../components/layout/button-action';
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
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total 72</span>
                        <div className="relative hidden md:block">
                            <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                                <i className="fi fi-rr-search"></i>
                            </div>
                            <input placeholder="Search" className="px-1 py-1.5 pl-7 bg-gray-200/70 dark:bg-cinder-700 rounded outline-none text-sm" />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ButtonAction onClick={showCreateModal}>
                            <i className="fi fi-rr-plus"></i>
                        </ButtonAction>
                        <ButtonAction>
                            <i className="fi fi-rr-heart"></i>
                        </ButtonAction>
                        <ButtonAction>
                            <i className="fi fi-rr-apps"></i>
                        </ButtonAction>
                        <ButtonAction>
                            <i className="fi fi-rr-menu-burger"></i>
                        </ButtonAction>
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
