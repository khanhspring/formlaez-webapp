import { Link, useRouteLoaderData } from 'react-router-dom';
import FormItem from '../../components/common/form-item';
import ButtonAction from '../../components/layout/button-action';
import PageTitle from '../../components/layout/page-title';
import { Workspace } from '../../models/workspace';

function TeamDetail() {

    const workspace = useRouteLoaderData("workspace") as Workspace;

    const pageActions = (
        <>
            <span className="dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer">Settings</span>
        </>
    )

    return (
        <div className="w-full flex flex-col gap-2">
            <PageTitle title="ReactJs Team" actions={pageActions} />
            <div className="flex items-center justify-between min-h-[40px] mt-3">
                <div className="flex items-center gap-3">
                    <span>Total 72</span>
                    <div className="relative hidden md:block">
                        <div className="absolute w-7 h-full flex items-center justify-center text-xs text-gray-500">
                            <i className="fi fi-rr-search"></i>
                        </div>
                        <input placeholder="Search" className="px-1 py-1.5 pl-7 bg-gray-200/70 dark:bg-cinder-700 rounded outline-none text-sm border-slate-900/10 dark:border-cinder-600" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ButtonAction>
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
                    [...Array(10)].map((item, index) =>
                        <Link to={`/${workspace.code}/teams/vuejs-team/forms/example-page`} key={index}>
                            <FormItem />
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default TeamDetail;
