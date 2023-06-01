import Tooltip from 'rc-tooltip';
import { useState } from 'react';
import { Link, useRevalidator, useRouteLoaderData } from 'react-router-dom';
import ActionSearchInput from '../../components/common/action-search-input/action-search-input';
import Empty from '../../components/common/empty';
import FormItem from '../../components/common/form-item';
import ButtonAction from '../../components/layout/button-action';
import PageTitle from '../../components/layout/page-title';
import useTeamContext from '../../hooks/auth/useTeamContext';
import useForms from '../../hooks/form/useForms';
import { Team } from '../../models/team';
import { Workspace } from '../../models/workspace';
import { firstLetters } from '../../util/string-utils';
import CreateFormModal from './components/create-form-modal';
import SettingsTeamModal from './components/settings-team-modal';
import TeamMemberModal from './components/team-member-modal';
import { PlusIcon } from '@heroicons/react/24/outline';

function TeamDetail() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const team = useRouteLoaderData("team") as Team;
    const [createModalVisible, setCreateModelVisible] = useState(false);
    const [memberModalVisible, setMemberModelVisible] = useState(false);
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const teamContext = useTeamContext();
    const { revalidate } = useRevalidator();

    const [keywords, setKeywords] = useState<string>();
    const { data: pages, refetch, isFetching } = useForms({ page: 0, scope: 'Team', teamId: team.id, workspaceId: workspace.id, keyword: keywords, size: -1 });

    const showCreateModal = () => {
        setCreateModelVisible(true);
    }

    const closeCreateModal = () => {
        setCreateModelVisible(false);
    }

    const showMemberModal = () => {
        setMemberModelVisible(true);
    }

    const closeMemberModal = () => {
        setMemberModelVisible(false);
    }

    const showSettingsModal = () => {
        setSettingsModalVisible(true);
    }

    const closeSettingsModal = () => {
        setSettingsModalVisible(false);
    }

    const onSearch = (keywords?: string) => {
        setKeywords(keywords);
    }

    const pageActions = (
        <>
            <span
                onClick={showMemberModal}
                className="text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
            >
                Members
            </span>
            {
                teamContext.isOwner &&
                <span
                    onClick={showSettingsModal}
                    className="text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer"
                >
                    Settings
                </span>
            }
        </>
    )

    const teamTitle = (
        <span className='flex gap-2 items-center whitespace-nowrap'>
            <span className='text-ellipsis overflow-hidden'>{team.name}</span>
            {
                team.description &&
                <Tooltip overlay={<div className='max-w-[270px]'>{team.description}</div>} placement="bottom">
                    <i className='fi fi-rr-info text-base' />
                </Tooltip>
            }
        </span>
    )

    return (
        <>
            <div className="flex-1 w-full flex flex-col gap-2">
                <PageTitle
                    title={teamTitle}
                    actions={pageActions}
                    shortTitle={firstLetters(team.name)}
                    iconClassName="bg-gradient-to-r from-teal-500 to-emerald-500"
                />
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total {pages ? pages?.totalElements : '...'}</span>
                        <ActionSearchInput onSearch={onSearch} loading={isFetching} />
                    </div>
                    <div className="flex items-center gap-2">
                        <ButtonAction onClick={showCreateModal} shape='circle'>
                            <PlusIcon className='w-6 h-6'/>
                        </ButtonAction>
                    </div>
                </div>
                {
                    !isFetching && pages && pages.totalElements === 0 &&
                    <div className='flex-1 flex items-center justify-center'>
                        <Empty />
                    </div>
                }
                {
                    pages && pages.totalElements > 0 &&
                    <div className="grid gap-5 grid-cols-1 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-6">
                        {
                            pages?.content?.map((item, index) => (
                                <Link to={`/${workspace.code}/t/${team.code}/f/${item.code}`} key={index}>
                                    <FormItem form={item} team={team} />
                                </Link>
                            ))
                        }
                    </div>
                }
            </div>
            <CreateFormModal
                visible={createModalVisible}
                onClose={closeCreateModal}
                refetch={refetch}
                teamId={team?.id}
            />
            <TeamMemberModal
                team={team}
                visible={memberModalVisible}
                onClose={closeMemberModal}
            />
            <SettingsTeamModal
                team={team}
                visible={settingsModalVisible}
                onClose={closeSettingsModal}
                refetch={revalidate}
            />
        </>
    );
}

export default TeamDetail;
