import { useState } from 'react';
import { Link, useRouteLoaderData } from 'react-router-dom';
import FormItem from "../../components/common/form-item";
import ButtonAction from '../../components/layout/button-action';
import PageTitle from '../../components/layout/page-title';
import useForms from '../../hooks/form/useForms';
import { Workspace } from '../../models/workspace';
import CreateFormModal from './components/create-form-modal';

function Private() {

    const workspace = useRouteLoaderData("workspace") as Workspace;
    const [createModalVisible, setCreateModelVisible] = useState(false);
    const [page, setPage] = useState(0);
    const { data: pages, refetch } = useForms({ page, scope: 'Private' });

    const showCreateModal = () => {
        setCreateModelVisible(true);
    }

    const closeCreateModal = () => {
        setCreateModelVisible(false);
    }

    const pageActions = (
        <>
            <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Settings</span>
        </>
    )

    return (
        <>
            <div className="w-full flex flex-col gap-2">
                <PageTitle title="Private" actions={pageActions} />
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
                    {
                        pages?.content?.map((item, index) => (
                            <Link to={`/${workspace.code}/private/forms/${item.code}`} key={index}>
                                <FormItem form={item} />
                            </Link>
                        ))
                    }
                </div>
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
