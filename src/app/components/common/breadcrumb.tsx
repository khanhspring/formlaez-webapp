import { FC, useMemo } from 'react';
import { Link, useLocation, useRouteLoaderData } from 'react-router-dom';
import { Workspace } from '../../models/workspace';

type BreadcrumbInfo = {
    name: string;
    path: string;
}

type Props = {

}

const Breadcrumb: FC<Props> = () => {

    const { pathname } = useLocation();

    const workspace = useRouteLoaderData("workspace") as Workspace;

    const pageName = useMemo((): BreadcrumbInfo => {
        if (pathname?.includes('/t')) {
            return {
                name: 'Teams',
                path: `/${workspace.code}/t`
            };
        }
        if (pathname?.includes('/p')) {
            return { name: 'Private', path: `/${workspace.code}/p` };
        }
        if (pathname?.includes('/settings') && !pathname?.includes('/f/')) {
            return { name: 'Settings', path: `/${workspace.code}/settings` };
        }
        return { name: 'Home', path: '/' }
    }, [pathname, workspace.code])

    return (
        <div className="flex flex-col h-full justify-center px-7">
            <h2 className="text-lg font-semibold dark:text-gray-200">{pageName.name}</h2>
            <div className="flex gap-1 text-xs text-gray-500 dark:text-gray-500">
                <Link to="/">
                    <span>Home</span>
                </Link>
                <span>/</span>
                <Link to={pageName.path} className="hover:text-slate-900 dark:hover:text-white">
                    <span>{pageName.name}</span>
                </Link>
            </div>
        </div>
    );
}

export default Breadcrumb;
