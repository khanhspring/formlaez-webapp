import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import ActionSearchInput from '../../components/common/action-search-input/action-search-input';
import Empty from '../../components/common/empty';
import FormItem from "../../components/common/form-item";
import ButtonAction from '../../components/layout/button-action';
import PageTitle from '../../components/layout/page-title';
import useForms from '../../hooks/form/useForms';
import { Workspace } from '../../models/workspace';
import CreateFormModal from './components/create-form-modal';
import { PlusIcon, UserIcon } from '@heroicons/react/24/outline';

function Private() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [createModalVisible, setCreateModelVisible] = useState(false);

    const [keywords, setKeywords] = useState<string>();
    const { data: pages, refetch, isFetching } = useForms({ page: 0, scope: 'Private', workspaceId: workspace.id, keyword: keywords, size: -1 });

    const showCreateModal = () => {
        setCreateModelVisible(true);
    }

    const closeCreateModal = () => {
        setCreateModelVisible(false);
    }

    const onSearch = (keywords?: string) => {
        setKeywords(keywords);
    }

    return (
        <>
            <div className="flex-1 w-full flex flex-col gap-2">
                <PageTitle
                    title="Private" actions={<></>}
                    shortTitle={<UserIcon className='w-4 h-4' />}
                    iconClassName="bg-gradient-to-r from-yellow-600 to-red-600"
                />
                <div className="flex items-center justify-between min-h-[40px] mt-3">
                    <div className="flex items-center gap-3">
                        <span>Total {pages ? pages?.totalElements : '...'}</span>
                        <ActionSearchInput onSearch={onSearch} loading={isFetching} />
                    </div>
                    <div className="flex items-center gap-2">
                        <ButtonAction onClick={showCreateModal} shape='circle'>
                            <PlusIcon className='w-6 h-6' />
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
                    <div className="grid gap-5 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 mt-6">
                        {
                            pages?.content?.map((item, index) => (
                                <Link to={`/${workspace.code}/p/f/${item.code}`} key={index}>
                                    <FormItem form={item} />
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
            />
        </>
    );
}

export default Private;
