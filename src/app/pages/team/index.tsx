import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import ActionSearchInput from '../../components/common/action-search-input/action-search-input';
import Empty from '../../components/common/empty';
import TeamItem from '../../components/common/team-item';
import ButtonAction from '../../components/layout/button-action';
import PageTitle from '../../components/layout/page-title';
import useTeams from '../../hooks/team/useTeams';
import { Workspace } from '../../models/workspace';
import CreateTeamModal from './components/create-team-modal';

function Team() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
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
            <div className="w-full flex flex-col gap-2">
                <PageTitle
                    title={"Teams"}
                    actions={<></>}
                    shortTitle={<i className='fi fi-rr-users-alt text-xs' />}
                    iconClassName="bg-gradient-to-r from-teal-500 to-emerald-500"
                />
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total {pages ? pages?.totalElements : '...'}</span>
                        <ActionSearchInput onSearch={onSearch} loading={isFetching} />
                    </div>
                    <div className="flex items-center gap-2">
                        <ButtonAction onClick={showCreateModal}>
                            <i className="fi fi-rr-plus"></i>
                        </ButtonAction>
                    </div>
                </div>
                <div className="grid gap-5 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
                    {
                        pages?.content.map((item, index) =>
                            <Link to={`/${workspace.code}/t/${item.code}`} key={index}>
                                <TeamItem team={item} />
                            </Link>
                        )
                    }
                </div>
                {
                    !isFetching && pages && pages.totalElements === 0 &&
                    <Empty />
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
