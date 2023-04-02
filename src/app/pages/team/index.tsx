import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import ActionSearchInput from '../../components/common/action-search-input/action-search-input';
import Empty from '../../components/common/empty';
import TeamItem from '../../components/common/team-item';
import ButtonAction from '../../components/layout/button-action';
import PageTitle from '../../components/layout/page-title';
import useWorkspaceContext from '../../hooks/auth/useWorkspaceContext';
import useTeams from '../../hooks/team/useTeams';
import { Workspace } from '../../models/workspace';
import CreateTeamModal from './components/create-team-modal';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function Team() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const workspaceContext = useWorkspaceContext();
    const [createModalVisible, setCreateModelVisible] = useState(false);

    const [keyword, setKeyword] = useState<string>();
    const { data: pages, refetch, isFetching } = useTeams({ workspaceId: workspace?.id, keyword: keyword, page: 0, size: -1 });

    const showCreateModal = () => {
        setCreateModelVisible(true);
    }

    const closeCreateModal = () => {
        setCreateModelVisible(false);
    }

    const onSearch = (keyword?: string) => {
        setKeyword(keyword);
    }

    return (
        <>
            <div className="flex-1 w-full flex flex-col gap-2">
                <PageTitle
                    title={"Teams"}
                    actions={<></>}
                    shortTitle={<UserGroupIcon className='w-4 h-4' />}
                    iconClassName="bg-gradient-to-r from-teal-500 to-emerald-500"
                />
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total {pages ? pages?.totalElements : '...'}</span>
                        <ActionSearchInput onSearch={onSearch} loading={isFetching} />
                    </div>
                    <div className="flex items-center gap-2">
                        {
                            workspaceContext.isOwner &&
                            <ButtonAction onClick={showCreateModal} shape='circle'>
                                <PlusIcon className='w-6 h-6'/>
                            </ButtonAction>
                        }
                    </div>
                </div>
                {
                    !isFetching && pages && pages.totalElements === 0 &&
                    <div className='flex-1 flex items-center justify-center pb-10'>
                        <Empty />
                    </div>
                }
                {
                    pages && pages.totalElements > 0 &&
                    <div className="grid gap-5 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
                        {
                            pages?.content.map((item, index) =>
                                <Link to={`/${workspace.code}/t/${item.code}`} key={index}>
                                    <TeamItem team={item} />
                                </Link>
                            )
                        }
                    </div>
                }
            </div>
            <CreateTeamModal
                visible={createModalVisible}
                onClose={closeCreateModal}
                refetch={refetch}
            />
        </>
    );
}

export default Team;
